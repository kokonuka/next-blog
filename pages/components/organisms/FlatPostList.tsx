import Link from 'next/link'
import {
  Box,
  Text
} from '@chakra-ui/react'
import CardList from '../cardList'
import { ViewPost } from '../../../graphql/types/posts'

type Props = {
  posts: ViewPost[]
}


export const FlatPostList: React.FC<Props> = ({ posts }) => {
  return (
    <Box 
      as='section'
      py="16"
      >
      <Text pb="5" color="gray.700" fontSize="3xl" fontWeight="bold">New Posts</Text>
      <CardList posts={posts}/>
      <Text mt="10" color="blue.500" textAlign="center">
        <Link href="/posts">全ての記事を見る</Link>
      </Text>
    </Box>
  )
}