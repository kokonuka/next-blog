import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Tag as TypeTag } from '../../graphql/types';
import { ViewPost } from '../../graphql/types/posts';
import { fetchGraphWithVariable } from '../../graphql/fetchGraphql';
import { getTagsQuery, getNextTagsQuery, getPostTag } from "../../graphql/queries/tags";
import { sliceText } from '../../lib/sliceText';
import { getDateDiff } from '../../lib/getDateDiff';
import CardList from '../../components/cardList';
import { Container, Text, Box } from "@chakra-ui/react"

type Props = {
  tag: TypeTag
  posts: ViewPost[]
}

const Tag: NextPage<Props> = ({ tag, posts }) => {

  return (
    <Container maxW="6xl">
      <Box as="section"pt="10" pb="36">
        <Text color="gray.700" fontSize="3xl" fontWeight="bold" textAlign="center">{tag.name}</Text>
        <Box mt="10">
          <CardList posts={posts}/>
        </Box>
      </Box>
    </Container>
  );
};

export default Tag;


export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

  const id = params!.id;
  const data = await fetchGraphWithVariable(getPostTag, { id });

  const posts = data.tag.contentNodes.nodes.map((post: ViewPost) => {
    post.clippedTitle = sliceText(post.title);
    post.dateDiff = getDateDiff(post.date);
    return post;
  });

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
