import { 
  Box
} from '@chakra-ui/react'

import CardSp from './cardSp'
import CardPc from './cardPc'

export default function cardList({ posts }) {
  console.log(posts)
  return (
    <>
      <Box display={{ base: "flex", md: "none"}} flexWrap="wrap" gap="10">
        {posts.map((post) => (
          <CardSp key={post.postId} post={post}/>
        ))}
      </Box>
      <Box display={{ base: "none", md: "grid"}} gridTemplateColumns="1fr 1fr" gridGap="5">
        <CardPc />
        <CardPc />
        <CardPc />
        <CardPc />
      </Box>
    </>
  )
}