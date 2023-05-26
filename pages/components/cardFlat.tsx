import Link from 'next/link'
import {
  Box,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react'
import { ViewPost } from '../../graphql/types/posts'

type Props = {
  post: ViewPost
}

export default function CardFlat({ post }: Props) {
  const category = post.categories.nodes[0];
  const tmpImageURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : tmpImageURL

  return (
    <>
      <Box as="article">
        <Box w="100%" display="flex">
          <Link href={`/posts/${post.databaseId}`}>
            <Image
              objectFit='cover'
              bg="white"
              width='75px'
              height='75px'
              borderRadius='2xl'
              src={imageUrl}
              alt='article'
            />
          </Link>
          <Box p="0" pl="3" flex="1">
          <Link href={`/posts/${post.databaseId}`}>
            <Heading size='md' color="gray.700">
              {post.clippedTitle || post.title}
            </Heading>
          </Link>
            <Box mt="3" fontSize="xs" display="flex" gap="2">
              {/* <Text fontSize="xs">{post.categories.nodes[0].name}</Text> */}
              <Link href={`categories/${category.id}`}>{category.name}</Link>
              <Text fontSize="xs">{post.dateDiff}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}