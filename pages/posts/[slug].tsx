import { GetServerSideProps } from "next"
import { Container, Image, Text, Box } from "@chakra-ui/react"
import { load } from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/nova.css';

type Props = {
  post: Post
}

type Post = {
  id: string
  title: string
  slug: string
  date: string
  content: string
  featuredImage: {
    node: {
      mediaItemUrl: string
    }
  }
  categories: {
    nodes: Array<{
      name: string
    }>
  }
}

const Post = ({ post }: Props) => {
  return (
    <>
      <Container maxW="6xl" py="10">
        <Text fontSize="4xl" fontWeight="bold" textAlign="center" color="gray.700">
          {post.title}
        </Text>
        <Text mt="5" fontWeight="bold" textAlign="center" color="gray.500">
          {post.date}
        </Text>
        <Box display={{ base: "block", lg: "flex" }} mt="10">
          <Box bg="white" p="5" borderRadius="10" width={{ base: "100%", lg: "60%" }}>
            <Image
              objectFit='cover'
              width="100%"
              maxH="96"
              borderRadius='2xl'
              src={post.featuredImage.node.mediaItemUrl}
              alt='Caffe Latte'
            />
            <Box py="10">
              <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </Box>
          </Box>
          <Box display={{ base: "none", lg: "block" }} width={{ base: "100%", lg: "40%" }} pl="5">
            <Box bg="white" p="5" borderRadius="10">
              サイドバー
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Post


const queryFunc = (slug: string | string[] | undefined) => {
  return `query getPosts {
    post(id: "${slug}" idType: SLUG) {
      postId
      date
      title
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }`
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  let query = queryFunc(slug)

  const response = await fetch(
    process.env.GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  )
  const data = await response.json()

  const $ = load(data.data.post.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });
  data.data.post.content = $.html();
  
  const props: Props = {
    post: data.data.post
  }

  return { props }
}