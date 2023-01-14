import { useState, useEffect } from 'react' 
import { Container, Button, Text, Box } from "@chakra-ui/react"

import { getDateDiff } from "../../lib/getDateDiff"
import { sliceText } from '../../lib/sliceText'

import CardList from "../../components/cardList"

type Props = {
  posts: Array<Post>,
  pageInfo: PageInfo
}

type Post = {
  id: string
  title: string
  slug: string
  date: string
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

type PageInfo = {
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string
  total: number
}

const postsQuery = `query getPosts {
  posts(first: 10) {
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
    pageInfo {
      total
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}`;

const nextPostsQuery = `query GetNextPostsQuery(
  $endCursor: String!
)
{
  posts(after: $endCursor) {
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
    pageInfo {
      total
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}`;

export const getStaticProps = async () => {
  const response = await fetch(
    process.env.GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: postsQuery }),
    },
  )
  const data = await response.json()
  const posts = data.data.posts.nodes.map((post: Post) => {
    post.date = getDateDiff(post.date)
    post.title = sliceText(post.title)
    return post
  })

  return {
    props:{
      posts,
      pageInfo: data.data.posts.pageInfo
    }
  }
}

const Index = ({ posts, pageInfo }: Props) => {
  const [postsState, setPostsState] = useState(posts)
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor)
  const [isNextPage, setIsNextPage] = useState(pageInfo.hasNextPage)

  const getNextPosts = async() => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          query: nextPostsQuery,
          variables: {endCursor: endCursor},
        }),
      },
    )
    const data = await response.json()
    const posts = data.data.posts.nodes.map((post: Post) => {
      post.date = getDateDiff(post.date)
      post.title = sliceText(post.title)
      return post
    })
    setPostsState([...postsState, ...posts])
    setEndCursor(data.data.posts.pageInfo.endCursor)
    if(posts.length < 10) setIsNextPage(false)
  }

  const handleClick = () => {
    getNextPosts()
  }

  return (
    <>
      <Container maxW="6xl">
        <Box 
          as="section"
          py="10"
          >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">Posts</Text>
          <Box mt="10">
            <CardList posts={postsState}/>
            {isNextPage && (
              <Box mt="10" textAlign="center">
                <Button 
                  onClick={handleClick}
                  colorScheme='blue' 
                  variant='link'
                  >
                  もっと見る
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Index
