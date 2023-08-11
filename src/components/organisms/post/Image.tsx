import NextImage from "next/image";
import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/generated/graphql";

type Props = {
  post: PostPageFragmentType;
};

export const Image: React.FC<Props> = ({ post }) => {
  const mediaItemUrl = post?.featuredImage?.node?.mediaItemUrl;
  const defaultPostImage = "https://source.unsplash.com/random";

  return (
    <Box px="3">
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
    </Box>
  );
};
