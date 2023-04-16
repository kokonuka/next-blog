import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Tag as TypeTag } from '../../graphql/types';
import { ViewPost } from '../../graphql/types/posts';
import { fetchGraphWithVariable } from '../../graphql/fetchGraphql';
import { getTagPosts } from '../../graphql/queries/tags';
import { getTagsQuery, getNextTagsQuery } from "../../graphql/queries/tags";

type Props = {
  tag: TypeTag
  posts: ViewPost[]
}

const Tag: NextPage<Props> = ({ tag, posts }) => {

  return (
    <div>
      <div>
      タグ名: {tag.name}
      </div>
      {posts.map((post: ViewPost) => (
        <div key={post.title}>
          <Link href={`/posts/${post.databaseId}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Tag;


export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

  const id = params!.id;
  const data = await fetchGraphWithVariable(getTagPosts, { id });

  return {
    props: {
      tag: data.tag,
      posts: data.tag.contentNodes.nodes,
    },
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let tags: TypeTag[] = [];

  let hasNextPage = true;
  let endCursor = "";
  while (hasNextPage) {
    const data = tags.length == 0 
      ? await fetchGraphWithVariable(getTagsQuery, { "count": 10 }) 
      : await fetchGraphWithVariable(getNextTagsQuery, { "endCursor": endCursor });

    tags.push(...data.tags.nodes);
    endCursor = data.tags.pageInfo.endCursor;

    if(!data.tags.pageInfo.hasNextPage) hasNextPage = false;
  };

  const paths = tags.map((tag: TypeTag) => {
    return {
      params: {
        id: `${tag.id}`
      }
    }
  });

  return {
    paths,
    fallback: false,
  };
};
