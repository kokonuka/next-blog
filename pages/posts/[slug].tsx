import { GetServerSideProps } from "next"
import { Container, Image, Text, Box } from "@chakra-ui/react"

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
            <Box py="10" px="5">
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
  
  const props: Props = {
    post: data.data.post
  }

  return { props }
}