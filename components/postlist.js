import Image from "next/image";
import Link from "next/link";
import GetImage from "@utils/getImage";
import { parseISO, format } from "date-fns";
import { PhotographIcon } from "@heroicons/react/outline";
import CategoryLabel from "@components/blog/category";
import styled from "styled-components";

const PostWrap = styled.div`
  margin-bottom: ${props => props.theme.space[9]};
  :last-child {
    margin-bottom: 0px;
  }
`;

export default function PostList({ post, aspect, preloadImage }) {
  const imageProps = post?.mainImage
    ? GetImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? GetImage(post.author.image)
    : null;

  return (
    <>
      <PostWrap>
        <div>
          <Link href={`/post/${post.slug.current}`}>
            <a>
              {imageProps ? (
                <Image
                  src={imageProps.src}
                  loader={imageProps.loader}
                  blurDataURL={imageProps.blurDataURL}
                  alt={post.mainImage.alt || "Thumbnail"}
                  placeholder="blur"
                  width="300px"
                  height="300px"
                  //sizes="(max-width: 640px) 90vw, 480px"

                  objectFit="cover"
                  priority={preloadImage ? true : false}
                />
              ) : (
                <span>
                  <PhotographIcon />
                </span>
              )}
            </a>
          </Link>
        </div>
        <CategoryLabel categories={post.categories} />
        <h2>
          <Link href={`/post/${post.slug.current}`}>
            <span>{post.title}</span>
          </Link>
        </h2>

        <div>
          {post.excerpt && (
            <p>
              <Link href={`/post/${post.slug.current}`}>
                {post.excerpt}
              </Link>
            </p>
          )}
        </div>

        <div>
          <div>
            <div>
              {post.author.image && (
                <Image
                  src={AuthorimageProps.src}
                  blurDataURL={AuthorimageProps.blurDataURL}
                  loader={AuthorimageProps.loader}
                  objectFit="cover"
                  alt={post?.author?.name}
                  placeholder="blur"
                  width="60px"
                  height="60px"
                />
              )}
            </div>
            <span>{post.author.name}</span>
          </div>
          <span>&bull;</span>
          <time dateTime={post?.publishedAt || post._createdAt}>
            {format(
              parseISO(post?.publishedAt || post._createdAt),
              "MMMM dd, yyyy"
            )}
          </time>
        </div>
      </PostWrap>
    </>
  );
}
