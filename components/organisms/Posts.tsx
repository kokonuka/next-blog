import { useState } from "react";
import client from "../../lib/graphqlClient";
import { FragmentType, graphql } from "../../gql";
import { Text, Box } from "@chakra-ui/react";
import { Card, PostVerticalFragment } from "../molecules/Card";
import InfiniteScroll from "react-infinite-scroller";
import { Loader } from "../molecules/Loader";

type Props = {};

export const allPostsWithVariablesQueryDocument = graphql(`
  query allPostsWithVariablesQuery($endCursor: String!) {
    posts(first: 10, after: $endCursor) {
      nodes {
        ...PostVerticalItem
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const Posts: React.FC<Props> = () => {
  const [posts, setPosts] = useState<
    FragmentType<typeof PostVerticalFragment>[]
  >([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState("");

  const loadMore = async (page: number) => {
    const { data } = await client.query({
      query: allPostsWithVariablesQueryDocument,
      variables: {
        endCursor: endCursor,
      },
    });

    setPosts([...posts, ...data.posts?.nodes!]);
    setEndCursor(data.posts?.pageInfo?.endCursor ?? "");

    if (!data.posts?.pageInfo?.hasNextPage) setHasMore(false);
  };

  return (
    <Box as="section">
      <Text
        color="gray.700"
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
      >
        Posts
      </Text>
      <Box mt="10">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<Loader key={0} />}
        >
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }}
            gridGap="5"
          >
            {posts.map((post, i) => (
              <Card post={post} key={i} />
            ))}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};
