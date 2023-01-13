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

export default function CardPc({ post }: Props) {
  const imageUrl = post.featuredImage
    ? post.featuredImage.node.mediaItemUrl 
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"

  return (
    <>
      <LinkBox>
        <Card
          display={{ base: "none", md: "block"}}
          h="100%"
        >
          <CardBody>
            <Image
              src={imageUrl}
              alt='Green double couch with wooden legs'
              bg="white"
              w="100%"
              h="64"
              objectFit='contain'
              borderRadius='lg'
            />
            <Stack 
              mt='6' 
              spacing="3"
            >
              <Heading size='md'>
                <LinkOverlay href={`posts/${post.id}`}>
                  {post.title}
                </LinkOverlay>
              </Heading>
              <Box fontSize="sm">
                <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
                {/* <Text>
                  This sofa is perfect for modern tropical spaces, baroque inspired
                  spaces, earthy toned spaces and for people who love a chic design with a
                  sprinkle of vintage design.
                </Text> */}
              </Box>
              <Text>
                〇日前
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </LinkBox>
    </>
  )
}