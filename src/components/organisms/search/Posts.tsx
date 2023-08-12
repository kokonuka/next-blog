/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FragmentType, graphql } from "@/gql/generated";
import client from "@/lib/graphqlClient";
import { PostFragment } from "@/gql/fragments/post";
import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { Loader } from "../../molecules/Loader";
import { BoxCard } from "@/components/molecules/BoxCard";

export const postsWhereSearchQueryDocument = graphql(`
  query postsWhereSearchQuery($keyword: String!, $endCursor: String!) {
    posts(where: { search: $keyword }, first: 10, after: $endCursor) {
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

export const Posts = () => {
  const router = useRouter();
  const [id, setId] = useState("");
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

  useEffect(() => {
    setPosts([]);
    setEndCursor("");
    setHasMore(true);
  }, [id]);

  useEffect(() => {
    const q = router.query.q;
    if (q !== "string") setId("");
    if (typeof q === "string") setId(q);
  }, [router]);

  const loadMore = async (page: number) => {
    const { data } = await client.query({
      query: postsWhereSearchQueryDocument,
      variables: {
        keyword: id,
        endCursor: endCursor,
      },
    });
    setPosts([...posts, ...data.posts?.nodes!]);
    setEndCursor(data.posts?.pageInfo?.endCursor ?? "");
    if (!data.posts?.pageInfo?.hasNextPage) setHasMore(false);
  };

  return (
    <>
      {id && (
        <Box
          pb="16"
          bg={useColorModeValue("blackAlpha.50", "gray.900")}
          flex="1"
        >
          <Container maxW="6xl" pt="10">
            <Text fontWeight="bold" fontSize="2xl">
              Posts
            </Text>
            <Box mt="5">
              <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<Loader key={0} />}
              >
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    base: "1fr",
                    md: "1fr 1fr",
                    lg: "1fr 1fr 1fr",
                  }}
                  gridGap="5"
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
          </Container>
        </Box>
      )}
    </>
  );
};
