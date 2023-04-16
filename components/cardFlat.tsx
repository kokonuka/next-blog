import Link from 'next/link'
import {
  Box,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react'
import { ViewPost } from '../graphql/types/posts'

type Props = {
  post: ViewPost
}

export default function CardFlat({ post }: Props) {
  const tmpImageURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : tmpImageURL

  return (
    <>
      <Box as="article">
        <Link href={`posts/${post.databaseId}`}>
          <Box w="100%" display="flex">
            <Image
              objectFit='cover'
              bg="white"
              width='75px'
              height='75px'
              borderRadius='2xl'
              src={imageUrl}
              alt='article'
            />
            <Box p="0" pl="3" flex="1">
              <Heading size='md' color="gray.700">
                {post.clippedTitle || post.title}
              </Heading>
              <Box mt="3" display="flex" gap="2">
                <Text fontSize="xs">{post.categories.nodes[0].name}</Text>
                <Text fontSize="xs">{post.dateDiff}</Text>
              </Box>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  )
}