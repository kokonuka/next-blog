import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Container, Box, Text } from '@chakra-ui/react'
import { Triangle } from 'react-loader-spinner'
import type { NextPage } from 'next'
import MainBisual from '../components/mainBisual'
import CardList from '../components/cardList'
import About from '../components/about'
import { getDateDiff } from '../lib/getDateDiff'
import { ViewPost } from '../graphql/types/posts'
import { getPostsQuery } from '../graphql/queries/posts'
import { fetchGraph } from '../graphql/fetchGraphql'

type Props = {
  posts: ViewPost[]
}

export const getStaticProps = async () => {
  const data = await fetchGraph(getPostsQuery);

  const posts = data.posts.nodes.map((post: ViewPost) => {
    post.dateDiff = getDateDiff(post.date);
    return post;
  });

  return {
    props: {
      posts
    }
  }
}

const Home:NextPage<Props> = (props) => {
  const { posts } = props;

  const [isLoading, setIsLoading] = useState(true)
  let loadingWrap = useRef<HTMLDivElement>(null)
  let loading = useRef<HTMLDivElement>(null)
  const keyName = 'visited';

  // ローディング処理
  useEffect(() => {
    if(sessionStorage.getItem(keyName)) {
      setIsLoading(false)
      return
    }
    setTimeout(() => loading.current?.classList.add("active"), 500)
    setTimeout(() => {
      loadingWrap.current?.classList.remove("active")
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }, 3000)
    sessionStorage.setItem(keyName, "true")
  }, [])

  // Twitterタイムライン埋め込み用JSの読み込み
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
    return () => {document.body.removeChild(script) };
  }, [])

  return (
    <>
      <Head>
        <title>kimagurecode</title>
        <meta name="description" content="Webエンジニアの備忘録" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainBisual />
      <Container maxW="6xl">
        <Box 
          as='section'
          py="16"
          >
          <Text pb="5" color="gray.700" fontSize="3xl" fontWeight="bold">New Posts</Text>
          <CardList posts={posts}/>
          <Text mt="10" color="blue.500" textAlign="center">
            <Link href="/posts">全ての記事を見る</Link>
          </Text>
        </Box>
        <About />
      </Container>
      {isLoading && (
        <Box 
          ref={loadingWrap} 
          className="loadingWrap active" 
          position="absolute" top="0" w="100%" h="100vh" bg="white" display="flex" justifyContent="center" alignItems="center" zIndex="2"
        >
          <Box ref={loading} className='loading' mt="-24">
            <Triangle
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default Home