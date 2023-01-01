import { 
  Box
} from '@chakra-ui/react'

import CardSp from './cardSp'
import CardPc from './cardPc'

export default function cardList({ posts }) {
  return (
    <>
      <Box display={{ base: "flex", md: "none"}} flexDirection="column" gap="10">
        {posts.length !== 0 && posts.map((post) => (
          <CardSp key={post.id} post={post}/>
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