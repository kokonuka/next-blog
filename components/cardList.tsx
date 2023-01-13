import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

import CardBox from './cardBox'
import CardFlat from './cardFlat'

interface Props {
  posts: Array<Post>
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

export default function cardList({ posts }: Props) {
  const router = useRouter()

  return (
    <>
      {router.pathname === "/" ? (
        <Box display="flex" flexDirection="column" gap="10">
          {posts.length !== 0 && posts.map((post: Post) => (
            <CardFlat post={post} key={post.id}/>
          ))}
        </Box>
      ) : (
        <Box 
          display="grid"
          gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr"}} 
          gridGap="5"
          >
          {posts.length !== 0 && posts.map((post: Post) => (
            <CardBox post={post} key={post.id}/>
          ))}
        </Box>
      )}
    </>
  )
}