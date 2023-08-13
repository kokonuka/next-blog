import NextImage from "next/image";
import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/generated/graphql";
import { isSvgUrl } from "@/lib/isSvgUrl";

type Props = {
  post: PostPageFragmentType;
};

export const PostImage: React.FC<Props> = ({ post }) => {
  const mediaItemUrl = post?.featuredImage?.node?.mediaItemUrl;
  const defaultPostImage = "https://source.unsplash.com/random";
  const isSvg = mediaItemUrl && isSvgUrl(mediaItemUrl);

  return (
    <Box px="3" pt={isSvg ? "14" : "50%"} position="relative">
      {isSvg ? (
        <NextImage
          src={mediaItemUrl || defaultPostImage}
          alt="article"
          width={1980}
          height={1150}
          style={{
            width: "100%",
            height: mediaItemUrl ? "100px" : "400px",
            objectFit: mediaItemUrl ? "contain" : "cover",
          }}
        />
      ) : (
        <NextImage
          src={mediaItemUrl || defaultPostImage}
          alt="article"
          fill
          style={{
            objectFit:
              mediaItemUrl && isSvgUrl(mediaItemUrl) ? "contain" : "cover",
          }}
        />
      )}
    </Box>
  );
};
