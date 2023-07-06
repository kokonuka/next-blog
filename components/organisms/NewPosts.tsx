import { useContext, useEffect } from "react";
import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import { Box, Text, Link } from "@chakra-ui/react";
import { LoadingContext } from "../../context/LoadingContext";
import { CardFlat } from "../cardFlat";

type Props = {};

export const allPostsQueryDocument = graphql(`
  query allPostsQuery {
    posts {
      nodes {
        ...PostItem
      }
    }
  }
`);

export const NewPosts: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(allPostsQueryDocument);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading, setIsLoading]);

  return (
    <Box as="section" py="16">
      <Text pb="5" color="gray.700" fontSize="3xl" fontWeight="bold">
        New Posts
      </Text>
      <Box display="flex" flexDirection="column" gap="10">
        {data &&
          data.posts?.nodes.map((post, i) => <CardFlat post={post} key={i} />)}
        {error && <p>データの読み込みができませんでした。</p>}
      </Box>
      <Text mt="10" color="blue.500" textAlign="center">
        <Link as={NextLink} href="/posts">
          全ての記事を見る
        </Link>
      </Text>
    </Box>
  );
};
