import "zenn-content-css";
import { PostPageFragment as PostPageFragmentType } from "@/gql/generated/graphql";
import { Box } from "@chakra-ui/react";
import RecommendedPostList from "./RecommendedPostList";
import PostContent from "./PostContent";

type Props = {
  post: PostPageFragmentType;
  content: string;
};

export const Content: React.FC<Props> = ({ post, content }) => {
  return (
    <Box
      as="main"
      width={{ base: "100%", lg: "70%" }}
      px={{ base: "4", lg: "0" }}
    >
      <PostContent post={post} content={content} />
      <RecommendedPostList post={post} />
    </Box>
  );
};
