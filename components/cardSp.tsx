import { 
  Box,
  Stack,
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
  categories: {
    nodes: Array<{
      name: string
    }>
  }
}

export default function CardSp({ post }: Props) {
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
            src={post.featuredImage.node.mediaItemUrl}
            alt='Caffe Latte'
          />
          <Stack>
            <CardBody p="0" pl="3">
              <LinkOverlay href={`posts/${post.slug}`}>
                <Heading size='md' color="gray.700">{post.title}</Heading>
              </LinkOverlay>
              <Box mt="3" display="flex" gap="2">
                <Text fontSize="xs">{post.categories.nodes[0].name}</Text>
                <Text fontSize="xs">〇日前</Text>
              </Box>
            </CardBody>
          </Stack>
        </Card>
      </LinkBox> 
    </>
  )
}