import { useState, useEffect } from 'react' 
import { Head } from '../../components/Head'
import { Container, Button, Text, Box } from "@chakra-ui/react"
import { ViewPost } from '../../graphql/types/posts'
import { fetchGraphWithVariable } from '../../graphql/fetchGraphql'
import { getPostsQuery, getNextPostsQuery } from '../../graphql/queries/posts'
import { useQuery } from '@apollo/client'
import { GetPostsDocument, Post } from '../../gql/generate/graphql'
import { DefaultLayout } from '../../components/templates/DefaultLayout'
import { Posts } from '../../components/organisms/Posts'
import { NextPage } from 'next'

type Props = {
  posts: ViewPost[],
  pageInfo: PageInfo
}

type PageInfo = {
  endCursor: string
}


const PostsPage:NextPage<Props> = ({ posts, pageInfo }) => {
  const { loading, error, data } = useQuery(GetPostsDocument)

  // const [postsState, setPostsState] = useState(posts)
  // const [endCursor, setEndCursor] = useState(pageInfo.endCursor)
  // const [isNextPage, setIsNextPage] = useState(posts.length === 10)

  // useEffect(() => {
  //   setPostsState(
  //     posts.map((post: ViewPost) => {
  //       post.dateDiff = getDateDiff(post.date);
  //       return post;
  //     })
  //   )
  // }, [posts])

  // const getNextPosts = async() => {
  //   const data = await fetchGraphWithVariable(getNextPostsQuery, { "endCursor": endCursor })
  //   const posts = data.posts.nodes.map((post: ViewPost) => {
  //     post.dateDiff = getDateDiff(post.date);
  //     post.clippedTitle = sliceText(post.title);
  //     return post
  //   })
  //   setPostsState([...postsState, ...posts])
  //   setEndCursor(data.posts.pageInfo.endCursor)
  //   if(posts.length < 10) setIsNextPage(false)
  // }

  // const handleClick = () => {
  //   getNextPosts()
  // }

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <>
      <Head title='Posts | kimagurecode' description='Webエンジニアの備忘録' />
      <DefaultLayout>
        <Posts />
        {/* <CardList posts={postsState}/> */}
        {/* {isNextPage && (
          <Box mt="14" textAlign="center">
            <Button 
              onClick={handleClick}
              colorScheme='blue' 
              variant='link'
              >
              もっと見る
            </Button>
          </Box>
        )} */}
      </DefaultLayout>
    </>
  )
}

export default PostsPage;
