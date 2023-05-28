import { Text, Box } from "@chakra-ui/react"
import { ColPosts } from "../molecules/ColPosts"
import { useQuery } from '@apollo/client'
import { GetPostsDocument, Post } from '../../gql/generate/graphql'

type Props = {}

// Todo: データを取得する処理
// インフィニティスクロール

// ページ表示の下部を取得

export const Posts: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GetPostsDocument)

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  const viewportHeight = window.innerHeight;
  console.log("ビューポートの高さ:", viewportHeight);

  const posts = data?.posts?.nodes as Post[]

  return (
    <Box as="section">
      <Text color="gray.700" fontSize="3xl" fontWeight="bold" textAlign="center">Posts</Text>
      <Box mt="10">
        <ColPosts posts={posts} />
      </Box>
    </Box>
  )
}