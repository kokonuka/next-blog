import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import CardBox from './cardBox'
import CardFlat from './cardFlat'
import { Post } from '../types/posts'

interface Props {
  posts: Array<Post>
}
export default function CardList({ posts }: Props) {
  const router = useRouter()

  return (
    <>
      {router.pathname === "/" ? (
        <Box display="flex" flexDirection="column" gap="10">
          {posts.length !== 0 && posts.map((post: Post) => (
            <CardFlat post={post} key={post.databaseId}/>
          ))}
        </Box>
      ) : (
        <Box 
          display="grid"
          gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr"}} 
          gridGap="5"
          >
          {posts.length !== 0 && posts.map((post: Post) => (
            <CardBox post={post} key={post.databaseId}/>
          ))}
        </Box>
      )}
    </>
  )
}