import { Box } from '@chakra-ui/react'

import CardSp from './cardSp'
import CardPc from './cardPc'

interface Props {
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

export default function cardList({ posts }: Props) {
  return (
    <>
      <Box display={{ base: "flex", md: "none"}} flexDirection="column" gap="10">
        {posts.length !== 0 && posts.map((post: Post) => (
          <CardSp key={post.id} post={post}/>
        ))}
      </Box>
      <Box display={{ base: "none", md: "grid"}} gridTemplateColumns="1fr 1fr" gridGap="5">
        {posts.length !== 0 && posts.map((post: Post) => (
          <CardPc key={post.id} post={post}/>
        ))}
      </Box>
    </>
  )
}