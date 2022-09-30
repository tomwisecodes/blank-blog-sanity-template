import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import client, {
  getClient,
  usePreviewSubscription,
  PortableText
} from "@lib/sanity";
import ErrorPage from "next/error";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { NextSeo } from "next-seo";
import defaultOG from "/public/img/opengraph.jpg";

import {
  singlequery,
  configQuery,
  pathquery,
  menuQuery
} from "@lib/groq";
import CategoryLabel from "@components/blog/category";
import AuthorCard from "@components/blog/authorCard";

export default function Post(props) {
  const { postdata, siteconfig, preview, menu } = props;

  const router = useRouter();
  const { slug } = router.query;

  const { data: post } = usePreviewSubscription(singlequery, {
    params: { slug: slug },
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const imageProps = post?.mainImage
    ? GetImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {post && siteConfig && (
        <Layout {...siteConfig} menu={menu}>
          <NextSeo
            title={`${post.title} - ${siteConfig.title}`}
            description={post.excerpt || ""}
            canonical={`${siteConfig?.url}/post/${post.slug.current}`}
            openGraph={{
              url: `${siteConfig?.url}/post/${post.slug.current}`,
              title: `${post.title} - ${siteConfig.title}`,
              description: post.excerpt || "",
              images: [
                {
                  url: GetImage(post?.mainImage).src || ogimage,
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: siteConfig.title
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />

          <Container>
            <div>
              <div>
                <CategoryLabel categories={post.categories} />
              </div>

              <h1>{post.title}</h1>

              <div>
                <div>
                  <div>
                    {AuthorimageProps && (
                      <Image
                        src={AuthorimageProps.src}
                        blurDataURL={AuthorimageProps.blurDataURL}
                        loader={AuthorimageProps.loader}
                        objectFit="cover"
                        alt={post?.author?.name}
                        placeholder="blur"
                        width="100px"
                        height="100px"
                      />
                    )}
                  </div>
                  <div>
                    <p>{post.author.name}</p>
                    <div>
                      <time
                        dateTime={
                          post?.publishedAt || post._createdAt
                        }>
                        {format(
                          parseISO(
                            post?.publishedAt || post._createdAt
                          ),
                          "MMMM dd, yyyy"
                        )}
                      </time>
                      <span>
                        · {post.estReadingTime || "5"} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <div>
            {imageProps && (
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                blurDataURL={imageProps.blurDataURL}
                alt={post.mainImage?.alt || "Thumbnail"}
                placeholder="blur"
                loading="eager"
                objectFit="cover"
                width="100px"
                height="100px"
              />
            )}
          </div>

          <Container>
            <article>
              <div>
                {post.body && <PortableText value={post.body} />}
              </div>
              <div>
                <Link href="/">
                  <a>← View all posts</a>
                </Link>
              </div>
            </article>
          </Container>
        </Layout>
      )}
    </>
  );
}

const MainImage = ({ image }) => {
  return (
    <div>
      <Image {...GetImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption>
        {image.caption && <span>{image.caption}</span>}
      </figcaption>
    </div>
  );
};

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const post = await getClient(preview).fetch(singlequery, {
    slug: params.slug
  });

  const config = await getClient(preview).fetch(configQuery);
  const menu = await client.fetch(menuQuery);
  return {
    props: {
      postdata: { ...post },
      siteconfig: { ...config },
      menu: menu.menuItem,
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathquery);

  return {
    paths:
      allPosts?.map(page => ({
        params: {
          slug: page.slug
        }
      })) || [],
    fallback: true
  };
}
