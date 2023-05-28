import { Box } from '@chakra-ui/react'
import { CardFlat } from '../cardFlat'
import { Post } from '../../gql/generate/graphql'

interface Props {
  posts: Post[]
}


export const LawPosts: React.FC<Props> = ({ posts }) => {

  return (
    <Box display="flex" flexDirection="column" gap="10">
      {posts.map((post) => (
        <CardFlat post={post} key={post.databaseId}/>
      ))}
    </Box>
  )
}