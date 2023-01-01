import { 
  Box
} from '@chakra-ui/react'

import CardSp from './cardSp'
import CardPc from './cardPc'

export default function cardList() {
  return (
    <>
      <Box display={{ base: "flex", md: "none"}} flexWrap="wrap" gap="10">
        <CardSp />
        <CardSp />
        <CardSp />
        <CardSp />
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