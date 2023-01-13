import { Container, Link, Text, Box } from "@chakra-ui/react"
import CardList from "../../components/cardList"

type Props = {
  posts: Array<Post>
}

type Post = {
  id: string
  title: string
  slug: string
  featuredImage: {
    node: {
      mediaItemUrl: string
    }
  }
  excerpt: string
  categories: {
    nodes: Array<{
      name: string
    }>
  }
}

const Index = ({ posts }: Props) => {
  return (
    <>
      <Container maxW="6xl">
        <Box as="section">
        <Text mt="10" fontSize="3xl" fontWeight="bold" textAlign="center">Posts</Text>
        <Box mt="10">
          <CardList posts={posts}/>
          <Text mt="10" color="blue.500" textAlign="center">
            <Link href="/">もっと見る</Link>
          </Text>
        </Box>
        </Box>
      </Container>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
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

  return {
    props:{
      posts: data.data.posts.nodes
    }
  }
}

const query = `query getPosts {
  posts(after: "1") {
    nodes {
      id
      slug
      date
      title
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      excerpt
      categories {
        nodes {
          name
        }
      }
    }
  }
}`;