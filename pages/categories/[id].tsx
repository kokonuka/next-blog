import { useContext, useEffect } from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { CategoryContext } from '../_app';
import { Category } from '../../graphql/types/categories';
import { ViewPost } from '../../graphql/types/posts';
import { fetchGraph, fetchGraphWithVariable } from '../../graphql/fetchGraphql';
import { getCategory, getCategoriesQuery } from '../../graphql/queries/categories';

type Props = {
  category: Category
  posts: ViewPost[]
}

const CategoryPage: NextPage<Props> = ({ category, posts }) => {
  const { setCarrentCategoryId } = useContext(CategoryContext);

  useEffect(() => setCarrentCategoryId(category.id), [category]);

  return (
    <div>
      <div>
        カテゴリー名: {category.name}
      </div>
      {posts.map((post: ViewPost) => (
        <div key={post.title}>
          <Link href={`/posts/${post.databaseId}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;


export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params!.id;
  const data = await fetchGraphWithVariable(getCategory, { id });

  return {
    props: {
      category: data.category,
      posts: data.category.contentNodes.nodes,
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
