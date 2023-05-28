import Link from 'next/link'
import { Box, Text, Image } from '@chakra-ui/react'
import { Post } from '../../gql/generate/graphql'
import React from 'react'

type Props = {
  post: Post
}


export const CardBox: React.FC<Props> = ({ post }) => {
  const category = post?.categories?.nodes[0];
  const defaultPostImage = "images/default_post_image.jpg"

  return (
    <>
      <Box
        as='article'
        bg="white"
        borderRadius='2xl'
        overflow="hidden"
        boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        position="relative"
      >
        <Link href={`/posts/${post.databaseId}`}>
          <Box position="relative" h="100px">
            <Image
              objectFit='cover'
              w="100%"
              h="100%"
              src={post.featuredImage?.node?.mediaItemUrl || defaultPostImage}
              alt='article'
            />
          </Box>
          <Box h="100px" pt="2" pb="3" px="3" display="flex" flexDirection="column">
            <Text  fontWeight="bold" flex="1">
              {/* {post.clippedTitle} */}{post.title}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {/* {post.dateDiff} */}{post.date}
            </Text>
          </Box>
        </Link>
        <Link href={`/categories/${category?.id}`}>
          <Text top="2" left="2" py="1" px="2" bg="blue.500" borderRadius="24" fontSize="xs" color="white" position="absolute" >
            {category?.name}
          </Text>
        </Link>
      </Box>
    </>
  );
}