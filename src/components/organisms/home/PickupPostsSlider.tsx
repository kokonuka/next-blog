import { useQuery } from "@apollo/client";
import { FragmentType } from "@/gql/generated";
import { PostFragment } from "@/gql/fragments/post";
import { Box, Text } from "@chakra-ui/react";
import { getPickupPostsQueryDocuments } from "@/gql/query/posts/getPickupPosts";
import { PostsSlider } from "./PostsSlider";

export const PickupPostsSlider = () => {
  const { data, loading, error } = useQuery(getPickupPostsQueryDocuments);

  if (error) return <Box>データの読み込みに失敗しました。</Box>;

  return (
    <Box as="section" mt="14" px={{ base: "4", lg: "0" }}>
      <Box>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          PICKUP
        </Text>
      </Box>
      <Box mt="5">
        <PostsSlider
          posts={data?.posts?.nodes as FragmentType<typeof PostFragment>[]}
          loading={loading}
        />
      </Box>
    </Box>
  );
};
