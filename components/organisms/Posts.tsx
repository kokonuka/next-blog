import { Text, Box } from "@chakra-ui/react"
import { ColPosts } from "../molecules/ColPosts"
import { GetNextPostsDocument, Post } from '../../gql/generate/graphql'
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from "react";
import client from "../../lib/graphqlClient";
import { Loader } from "../molecules/Loader";

type Props = {}


export const Posts: React.FC<Props> = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState("");

  const loadMore = async (page: number) => {
    const { data } = await client.query({
      query: GetNextPostsDocument,
      variables: {
        endCursor: endCursor
      }
    });

    setPosts([ ...posts, ...data.posts?.nodes as Post[] ])
    setEndCursor(data.posts?.pageInfo?.endCursor ?? "")

    if(!data.posts?.pageInfo?.hasNextPage) setHasMore(false);
  }

  return (
    <Box as="section">
      <Text color="gray.700" fontSize="3xl" fontWeight="bold" textAlign="center">Posts</Text>
      <Box mt="10">
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<Loader key={0} />} >
          <ColPosts posts={posts} />
        </InfiniteScroll>
      </Box>
    </Box>
  )
}