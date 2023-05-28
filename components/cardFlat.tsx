import Link from 'next/link'
import { Box, Heading, Text, Image } from '@chakra-ui/react'
import { Post } from '../gql/generate/graphql'

type Props = {
  post: Post
}


export const CardFlat: React.FC<Props> = ({ post }) => {
  const category = post?.categories?.nodes[0];
  const defaultPostImage = "../images/default_post_image.jpg"

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
              src={post.featuredImage?.node?.mediaItemUrl || defaultPostImage}
              alt='article'
            />
          </Link>
          <Box p="0" pl="3" flex="1">
          <Link href={`/posts/${post.databaseId}`}>
            <Heading size='md' color="gray.700">
              {post.title}{/* {post.clippedTitle} */}
            </Heading>
          </Link>
            <Box mt="3" fontSize="xs" display="flex" gap="2">
              <Link href={`/categories/${category?.id}`}>{category?.name}</Link>
              <Text fontSize="xs">
                {post.date}{/* {post.dateDiff} */}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}