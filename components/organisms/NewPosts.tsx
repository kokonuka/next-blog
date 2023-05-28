import Link from 'next/link'
import { Box, Text } from '@chakra-ui/react'
import { LawPosts } from '../molecules/LawPosts'
import { useQuery } from '@apollo/client'
import { GetPostsDocument, Post } from '../../gql/generate/graphql'

type Props = {}

// Todo: ローディング

export const NewPosts: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GetPostsDocument)

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <Box as='section' py="16">
      <Text pb="5" color="gray.700" fontSize="3xl" fontWeight="bold">New Posts</Text>
      <LawPosts posts={data?.posts?.nodes as Post[]}/>
      <Text mt="10" color="blue.500" textAlign="center">
        <Link href="/posts">全ての記事を見る</Link>
      </Text>
    </Box>
  )
}