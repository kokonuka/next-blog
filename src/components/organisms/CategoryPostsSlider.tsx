import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { FragmentType, graphql } from "@/gql/generated";
import { PostFragment } from "../molecules/Card";
import { Box, Text, Link, Skeleton, useColorModeValue } from "@chakra-ui/react";
import { PostsSlider } from "./PostsSlider";

type Props = {
  name: string;
};

export const categoryWhereCategoryNameQueryDocument = graphql(`
  query categoryWhereCategoryNameQuery($name: [String]) {
    categories(where: { name: $name }) {
      nodes {
        id
        name
        posts {
          nodes {
            ...PostItem
          }
        }
      }
    }
  }
`);

export const CategoryPostsSlider: React.FC<Props> = ({ name }) => {
  const { loading, error, data } = useQuery(
    categoryWhereCategoryNameQueryDocument,
    {
      variables: {
        name,
      },
    }
  );

  if (error) return <Box>データの読み込みに失敗しました。</Box>;

  return (
    <Box as="section" mt="14">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Skeleton isLoaded={!loading} mr="5">
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            {data ? data.categories?.nodes[0].name : "hogehoge"}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!loading}>
          <Text color="blue.500">
            <Link
              as={NextLink}
              href={`/categories/${data?.categories?.nodes[0].id}`}
            >
              view all →
            </Link>
          </Text>
        </Skeleton>
      </Box>
      <Box mt="5">
        <PostsSlider
          posts={
            data?.categories?.nodes[0].posts?.nodes as FragmentType<
              typeof PostFragment
            >[]
          }
          loading={loading}
        />
        {error && <p>データの読み込みに失敗しました。</p>}
      </Box>
    </Box>
  );
};
