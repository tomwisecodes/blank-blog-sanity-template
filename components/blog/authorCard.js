import Image from "next/image";
import { PortableText } from "@lib/sanity";
import GetImage from "@utils/getImage";

export default function AuthorCard({ author }) {
  const imageProps = author?.image ? GetImage(author.image) : null;
  return (
    <div>
      <div>
        <div>
          {imageProps && (
            <Image
              src={imageProps.src}
              loader={imageProps.loader}
              blurDataURL={imageProps.blurDataURL}
              objectFit="cover"
              alt={author.name}
              placeholder="blur"
              layout="fill"
            />
          )}
        </div>
        <div>
          <div>
            <h4>About {author.name}</h4>
          </div>
          <div>
            {author.bio && <PortableText value={author.bio} />}
          </div>
        </div>
      </div>
    </div>
  );
}
