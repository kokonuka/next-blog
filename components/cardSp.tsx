import Link from 'next/link'
import {
  Box,
  Stack,
  Heading,
  Text,
  Image, 
  Card, 
  CardBody,
} from '@chakra-ui/react'

type Props = {
  post: Post
}

type Post = {
  id: string
  title: string
  slug: string
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

export default function CardSp({ post }: Props) {
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"

  return (
    <>
      <a href={`posts/${post.slug}`}>
        <Card
          w="100%"
          border="0"
          flexDirection="row"
          overflow='hidden'
          variant='outline'
        >
          <Image
            objectFit='cover'
            bg="white"
            width={{ base: '75px' }}
            height={{ base: '75px' }}
            borderRadius='2xl'
            src={imageUrl}
            alt='Caffe Latte'
          />
          <Stack>
            <CardBody p="0" pl="3">
              <Heading size='md' color="gray.700">{post.title}</Heading>
              <Box mt="3" display="flex" gap="2">
                <Text fontSize="xs">{post.categories.nodes[0].name}</Text>
                <Text fontSize="xs">〇日前</Text>
              </Box>
            </CardBody>
          </Stack>
        </Card>
      </a>
    </>
  )
}