import { useContext, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { CategoryContext } from '../_app';
import { Category } from '../../graphql/types/categories';
import { ViewPost } from '../../graphql/types/posts';
import { fetchGraph, fetchGraphWithVariable } from '../../graphql/fetchGraphql';
import { getCategory, getCategoriesQuery } from '../../graphql/queries/categories';
import { sliceText } from '../../lib/sliceText';
import { getDateDiff } from '../../lib/getDateDiff';
import CardList from '../../components/cardList';
import { Container, Text, Box } from "@chakra-ui/react"

type Props = {
  category: Category
  posts: ViewPost[]
}

const CategoryPage: NextPage<Props> = ({ category, posts }) => {
  const { setCarrentCategoryId } = useContext(CategoryContext);

  useEffect(() => setCarrentCategoryId(category.id), [category]);

  return (
    <Container maxW="6xl">
      <Box as="section"pt="10" pb="36">
        <Text color="gray.700" fontSize="3xl" fontWeight="bold" textAlign="center">{category.name}</Text>
        <Box mt={3} whiteSpace="pre-wrap">{category.description}</Box>
        <Box mt="10">
          <CardList posts={posts}/>
        </Box>
      </Box>
    </Container>
  );
};

export default CategoryPage;


export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params!.id;
  const data = await fetchGraphWithVariable(getCategory, { id });

  const posts = data.category.contentNodes.nodes.map((post: ViewPost) => {
    post.clippedTitle = sliceText(post.title);
    post.dateDiff = getDateDiff(post.date);
    return post;
  });

  return {
    props: {
      category: data.category,
      posts: posts,
    },
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchGraph(getCategoriesQuery);
  const paths = data.categories.nodes.map((category: Category) => {
    return {
      params: {
        id: `${category.id}`
      }
    }
  });

  return {
    paths,
    fallback: false,
  };
};
