import { 
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
  categories: {
    nodes: Array<{
      name: string
    }>
  }
}

export default function CardPc({ post }: Props) {
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"

  return (
    <>
      <a href={`posts/${post.slug}`}>
        <Card 
          w="100%"
          display={{ base: "none", md: "block"}}
        >
          <CardBody>
            <Image
              src={imageUrl}
              alt='Green double couch with wooden legs'
              bg="white"
              w="100%"
              h="56"
              objectFit='contain'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>{post.title}</Heading>
              <Text>
                This sofa is perfect for modern tropical spaces, baroque inspired
                spaces, earthy toned spaces and for people who love a chic design with a
                sprinkle of vintage design.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </a>
    </>
  )
}