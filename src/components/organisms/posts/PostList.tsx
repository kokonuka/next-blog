import React, { useEffect, useState } from "react";
import client from "../../../lib/graphqlClient";
import { FragmentType, graphql } from "@/gql/generated";
import { PostFragment } from "@/gql/fragments/post";
import { Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { Loader } from "../../molecules/Loader";
import { BoxCard } from "@/components/molecules/BoxCard";
import { Heading } from "../../atoms/Heading";

type Props = {};

export const allPostsWithVariablesQueryDocument = graphql(`
  query allPostsWithVariablesQuery($endCursor: String!) {
    posts(first: 10, after: $endCursor) {
      nodes {
        ...Post
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const PostList: React.FC<Props> = () => {
  const [posts, setPosts] = useState<FragmentType<typeof PostFragment>[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState("");
  const [unsplashImages, setUnsplashImages] = useState([""]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=tech&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY}`
      )
      .then((res) => {
        let unsplashImages: string[] = [];
        res.data.results.map((obj: any) => {
          unsplashImages.push(obj.urls.regular);
        });
        setUnsplashImages(unsplashImages);
      });
  }, []);

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
      <Heading text="Latest" />
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
            gridGap="4"
          >
            {posts.map((post, i) => (
              <BoxCard
                post={post}
                loading={false}
                i={i}
                unsplashImages={unsplashImages}
                key={i}
              />
            ))}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};
