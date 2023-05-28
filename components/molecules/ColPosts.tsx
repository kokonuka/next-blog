import { Box } from '@chakra-ui/react'
import { Card } from './Card'
import { Post } from '../../gql/generate/graphql'

interface Props {
  posts: Post[]
}


export const ColPosts: React.FC<Props> = ({ posts }) => {
  return (
    <Box 
      display="grid"
      gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr"}} 
      gridGap="5" >
      {posts.map((post) => (
        <Card post={post} key={post.databaseId}/>
      ))}
    </Box>
  )
}