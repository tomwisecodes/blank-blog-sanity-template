import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import defaultOG from "../public/img/opengraph.jpg";
import { postquery, configQuery, menuQuery } from "@lib/groq";
import GetImage from "@utils/getImage";
import PostListItem from "@components/postlist";
import { Grid, GridItem } from "@components/grid/grid";

export default function Post(props) {
  const { postdata, siteconfig, preview, menu } = props;

  const router = useRouter();
  const { data: posts } = usePreviewSubscription(postquery, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined
  });
  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig} menu={menu}>
          <Container>
            <div>
              {posts.slice(0, 2).map(post => (
                <PostListItem
                  key={post._id}
                  post={post}
                  aspect="landscape"
                  preloadImage={true}
                />
              ))}
            </div>
            <div>
              {posts.slice(2).map(post => (
                <PostListItem
                  key={post._id}
                  post={post}
                  aspect="square"
                />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postquery);
  const config = await getClient(preview).fetch(configQuery);
  const menu = await getClient(preview).fetch(menuQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      postdata: post,
      // categories: categories,
      siteconfig: { ...config },
      menu: menu.menuItem,
      preview
    },
    revalidate: 10
  };
}
