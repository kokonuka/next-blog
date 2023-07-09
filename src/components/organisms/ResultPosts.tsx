import { Box, Text } from "@chakra-ui/react";
import { Post } from "../../graphql/generate/graphql";
import { ColPosts } from "../molecules/ColPosts";
import { Card } from "../molecules/Card";
import { Loader } from "../molecules/Loader";

type Props = {
  posts: Post[];
  isPostsLoading: boolean;
};

export const ResultPosts: React.FC<Props> = ({ posts, isPostsLoading }) => {
  return (
    <Box mt="10">
      <Text fontWeight="bold">Posts</Text>
      <Box mt="5">
        {isPostsLoading ? <Loader /> : <ColPosts posts={posts} />}
      </Box>
    </Box>
  );
};
