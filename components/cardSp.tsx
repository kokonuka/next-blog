import { 
  Box,
  Stack,
  Heading,
  Text,
  Image, 
  Card, 
  CardBody, 
} from '@chakra-ui/react'

export default function CardSp({ post }) {
  return (
    <>
      <Card
        w="100%"
        border="0"
        flexDirection="row"
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          width={{ base: '75px' }}
          height={{ base: '75px' }}
          borderRadius='2xl'
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
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
    </>
  )
}