import NextImage from "next/image";
import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/graphql";

type Props = {
  post: PostPageFragmentType;
};

export const Image: React.FC<Props> = ({ post }) => {
  const defaultPostImage = "https://source.unsplash.com/random";

  return (
    <Box>
      <NextImage
        src={post?.featuredImage?.node?.mediaItemUrl || defaultPostImage}
        alt="article"
        width={1980}
        height={1150}
        style={{
          width: "100%",
          height: "100px",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};
