import { 
  Stack,
  Box,
  Heading,
  Text,
  Image, 
  Card, 
  CardBody,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'

type Props = {
  post: Post
}

type Post = {
  id: string
  title: string
  slug: string
  date: string
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

export default function CardFlat({ post }: Props) {
  const tmpImageURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : tmpImageURL

  return (
    <>
      <LinkBox>
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
              <Heading size='md' color="gray.700">
                <LinkOverlay href={`posts/${post.id}`}>
                  {post.title}
                </LinkOverlay>
              </Heading>
              <Box mt="3" display="flex" gap="2">
                <Text fontSize="xs">{post.categories.nodes[0].name}</Text>
                <Text fontSize="xs">{post.date}</Text>
              </Box>
            </CardBody>
          </Stack>
        </Card>
      </LinkBox>
    </>
  )
}