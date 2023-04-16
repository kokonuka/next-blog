import { useState, useEffect } from 'react' 
import Head from 'next/head'
import { Container, Button, Text, Box } from "@chakra-ui/react"
import { getDateDiff } from "../../lib/getDateDiff"
import { sliceText } from '../../lib/sliceText'
import CardList from "../../components/cardList"
import { ViewPost } from '../../graphql/types/posts'
import { fetchGraphWithVariable } from '../../graphql/fetchGraphql'
import { getPostsQuery, getNextPostsQuery } from '../../graphql/queries/posts'

type Props = {
  posts: ViewPost[],
  pageInfo: PageInfo
}

type PageInfo = {
  endCursor: string
}

export const getStaticProps = async () => {
  const data = await fetchGraphWithVariable(getPostsQuery, { "count": 10 })
  const posts = data.posts.nodes.map((post: ViewPost) => {
    post.clippedTitle = sliceText(post.title);
    return post
  })

  return {
    props:{
      posts,
      pageInfo: data.posts.pageInfo
    }
  }
}

const Index = ({ posts, pageInfo }: Props) => {

  const [postsState, setPostsState] = useState(posts)
  const [endCursor, setEndCursor] = useState(pageInfo.endCursor)
  const [isNextPage, setIsNextPage] = useState(posts.length === 10)

  useEffect(() => {
    setPostsState(
      posts.map((post: ViewPost) => {
        post.dateDiff = getDateDiff(post.date);
        return post;
      })
    )
  }, [posts])

  const getNextPosts = async() => {
    const data = await fetchGraphWithVariable(getNextPostsQuery, { "endCursor": endCursor })
    const posts = data.posts.nodes.map((post: ViewPost) => {
      post.dateDiff = getDateDiff(post.date);
      post.clippedTitle = sliceText(post.title);
      return post
    })
    setPostsState([...postsState, ...posts])
    setEndCursor(data.posts.pageInfo.endCursor)
    if(posts.length < 10) setIsNextPage(false)
  }

  const handleClick = () => {
    getNextPosts()
  }

  return (
    <>
      <Head>
        <title>Posts | kimagurecode</title>
        <meta name="description" content="駆け出しエンジニアの備忘録" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="6xl">
        <Box as="section"pt="10" pb="36">
          <Text color="gray.700" fontSize="3xl" fontWeight="bold" textAlign="center">Posts</Text>
          <Box mt="10">
            <CardList posts={postsState}/>
            {isNextPage && (
              <Box mt="14" textAlign="center">
                <Button 
                  onClick={handleClick}
                  colorScheme='blue' 
                  variant='link'
                  >
                  もっと見る
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Index
