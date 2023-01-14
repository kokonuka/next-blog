import Link from 'next/link'
import {
  Box,
  Text,
  Image,
} from '@chakra-ui/react'

type Props = {
  post: Post
}

type Post = {
  id: string
  title: string
  slug: string
  date:string
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

export default function CardBox({ post }: Props) {
  const tmpImageURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : tmpImageURL

  return (
    <>
      <Box as='article' bg="white" borderRadius='2xl' overflow="hidden" boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)">
        <Link href={`posts/${post.id}`}>
          <Box position="relative" h="100px">
            <Image
              position="absolute"
              top="0"
              objectFit='cover'
              w="100%"
              h="100%"
              src={imageUrl}
            />
            <Text 
              position="absolute" 
              top="2" 
              left="2" 
              py="1"
              px="2"
              bg="blue.500"
              borderRadius="24"
              fontSize="xs"
              color="white"
              >
              {post.categories.nodes[0].name}
            </Text>
          </Box>
          <Box h="100px" pt="2" pb="3" px="3" display="flex" flexDirection="column">
              <Text  fontWeight="bold" flex="1">
                {post.title}
              </Text>
            <Text fontSize="xs" color="gray.400">{post.date}</Text>
          </Box>
        </Link>
      </Box>
    </>
  )
}