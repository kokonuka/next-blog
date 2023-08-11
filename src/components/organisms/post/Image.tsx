import NextImage from "next/image";
import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/generated/graphql";
import { isJpgUrl } from "@/lib/isJpgUrl";

type Props = {
  post: PostPageFragmentType;
};

export const Image: React.FC<Props> = ({ post }) => {
  const mediaItemUrl = post?.featuredImage?.node?.mediaItemUrl;
  const defaultPostImage = "https://source.unsplash.com/random";
  const isJpgUrlResult = !mediaItemUrl || isJpgUrl(mediaItemUrl ?? "");

  return (
    <Box px="3" pt={isJpgUrlResult ? "50%" : ""} position="relative">
      {isJpgUrlResult ? (
        <NextImage
          src={mediaItemUrl || defaultPostImage}
          alt="article"
          fill
          style={{
            objectFit:
              isJpgUrl(mediaItemUrl ?? "") || !mediaItemUrl
                ? "cover"
                : "contain",
          }}
        />
      ) : (
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
      )}
    </Box>
  );
};
