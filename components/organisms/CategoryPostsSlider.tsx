import { useContext, useEffect } from "react";
import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { FragmentType, graphql } from "../../gql";
import { Box, Text, Link } from "@chakra-ui/react";
import { LoadingContext } from "../../context/LoadingContext";
import { PostFragment } from "../molecules/Card";
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

  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading, setIsLoading]);

  return (
    <Box as="section" mt="20">
      {data && (
        <>
          <Box display="flex" alignItems="center">
            <Text mr="5" color="gray.700" fontSize="5xl" fontWeight="bold">
              {data.categories?.nodes[0].name}
            </Text>
            <Text color="blue.500">
              <Link
                as={NextLink}
                href={`/categories/${data.categories?.nodes[0].id}`}
              >
                すべて見る
              </Link>
            </Text>
          </Box>
          <Box mt="5">
            <PostsSlider
              posts={
                data.categories?.nodes[0].posts?.nodes as FragmentType<
                  typeof PostFragment
                >[]
              }
            />
            {error && <p>データの読み込みに失敗しました。</p>}
          </Box>
        </>
      )}
    </Box>
  );
};
