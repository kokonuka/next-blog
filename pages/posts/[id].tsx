import { Head } from "../../components/Head";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import { Container, Image, Text, Box, Tag as ChakraTag } from "@chakra-ui/react"
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/nova.css';
import { formatDate } from "../../lib/formatDate";
import { Post } from "../../graphql/types/posts";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { getPostQuery, getPostsQuery, getNextPostsQuery } from "../../graphql/queries/posts";
import { Tag } from "../../graphql/types";
import { ViewPost } from "../../graphql/types/posts";
import { PostLayout } from "../../components/templates/PostLayout";
import styles from '../../styles/Post.module.css';
import 'zenn-content-css';

type Props = {
  post: ViewPost
}

const Post: NextPage<Props> = ({ post }) => {
  post.formattedDate = formatDate(post.date);
  const tags = post.tags.nodes;
  const tmpImageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : tmpImageUrl

  return (
    <>
      <Head title={`${post.title} |  kimagurecode`} description='Webエンジニアの備忘録' />
      <PostLayout>
        <Container maxW="6xl" py="10" px={{ base: "0", lg: "4" }}>
          <Box p="5">
            <Text mt="10" fontSize={{base: "2xl", lg: "4xl" }} color="gray.700">
              {post.title}
            </Text>
            <Text mt="5" color="gray.500">
              {post.formattedDate}
            </Text>
          </Box>
          <Box mt="10" display={{ base: "block", lg: "flex" }}>
            <Box width={{ base: "100%", lg: "60%" }} bg="white" p="5" borderRadius={{ base: "0", lg: "10" }} py="10">
              <Box pb="10" display="flex" flexWrap="wrap" gap="2">
                {tags.length > 0 && post.tags.nodes.map((tag: Tag) => (
                  <Link href={`/tags/${tag.id}`} key={tag.id} >
                    <ChakraTag>
                      {tag.name}
                    </ChakraTag>
                  </Link>
                ))}
              </Box>
              <div className={`post-content znc ${styles.body}`} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </Box>
            <Box display={{ base: "none", lg: "block" }} width={{ base: "100%", lg: "40%" }} pl="5">
              <Box bg="white" p="5" borderRadius="10">
                {/* サイドバー */}
              </Box>
            </Box>
          </Box>
        </Container>
      </PostLayout>
    </>
  )
}

export default Post;


export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params!.id;
  const data = await fetchGraphWithVariable(getPostQuery, { id })
  const post = data.post

  const $ = load(post.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  post.content = $.html();

  return {
    props: {
      post
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {

  let posts: Post[] = [];

  let hasNextPage = true;
  let endCursor = "";
  while (hasNextPage) {
    const data = posts.length == 0 
      ? await fetchGraphWithVariable(getPostsQuery, { "count": 10 }) 
      : await fetchGraphWithVariable(getNextPostsQuery, { "endCursor": endCursor });

    posts.push(...data.posts.nodes);
    endCursor = data.posts.pageInfo.endCursor;

    if(!data.posts.pageInfo.hasNextPage) hasNextPage = false;
  };

  const paths = posts.map((post: Post) => {
    return {
      params: {
        id: `${post.databaseId}`
      }
    }
  });

  return {
    paths,
    fallback: false,
  };
};
