import { useState } from 'react' 
import { Container, Button, Text, Box } from "@chakra-ui/react"
import { getDateDiff } from "../../lib/getDateDiff"
import { sliceText } from '../../lib/sliceText'
import CardList from "../../components/cardList"
import { Post } from '../../types/posts'
import { fetchGraphWithVariable } from '../../lib/fetchGraphql'
import { getPostsQuery, getNextPostsQuery } from '../../queries/posts'

type Props = {
  posts: Array<Post>,
  pageInfo: PageInfo
}

type PageInfo = {
  endCursor: string
}

export const getStaticProps = async () => {
  const data = await fetchGraphWithVariable(getPostsQuery, { "count": 10 })
  const posts = data.posts.nodes.map((post: Post) => {
    post.date = getDateDiff(post.date)
    post.title = sliceText(post.title)
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

  const getNextPosts = async() => {
    const data = await fetchGraphWithVariable(getNextPostsQuery, { "endCursor": endCursor })
    const posts = data.posts.nodes.map((post: Post) => {
      post.date = getDateDiff(post.date)
      post.title = sliceText(post.title)
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
      <Container maxW="6xl">
        <Box 
          as="section"
          py="10"
          >
          <Text fontSize="3xl" fontWeight="bold" textAlign="center">Posts</Text>
          <Box mt="10">
            <CardList posts={postsState}/>
            {isNextPage && (
              <Box mt="10" textAlign="center">
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
