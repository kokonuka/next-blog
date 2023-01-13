import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Container, Box, Text } from '@chakra-ui/react'
import { Blocks, Triangle } from 'react-loader-spinner'

import type { NextPage } from 'next'

import Hero from '../components/hero'
import CardList from '../components/cardList'
import Twitter from '../components/twitter'

import { getDateDiff } from '../lib/getDateDiff'

type Props = {
  posts: Array<Post>
}

type Post = {
  id: string
  title: string
  slug: string
  date: string
  featuredImage: {
    node: {
      mediaItemUrl: string
    }
  }
  excerpt: string
  categories: {
    nodes: Array<{
      name: string
    }>
  }
}

const query = `query getPosts {
  posts(first: 8) {
    nodes {
      id
      slug
      date
      title
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      excerpt
      categories {
        nodes {
          name
        }
      }
    }
  }
}`;

export const getStaticProps = async () => {
  const response = await fetch(
    process.env.GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  )
  const data = await response.json()
  const posts = data.data.posts.nodes.map((post: Post) => {
    post.date = getDateDiff(post.date)
    return post
  })

  return {
    props:{
      posts
    }
  }
}

const Home:NextPage<Props> = (props) => {
  const { posts } = props

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
        <title>HogeHoge</title>
        <meta name="description" content="駆け出しエンジニアの備忘録" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Container maxW="6xl">
        <Box 
          as='section'
          py="16"
          >
          <Text pb="5" fontSize="3xl" fontWeight="bold">New Posts</Text>
          <CardList posts={posts}/>
          <Text mt="10" color="blue.500" textAlign="center">
            <Link href="/posts">全ての記事を見る</Link>
          </Text>
        </Box>

        {/* 自己紹介 */}

        <Twitter />

        {/* タグ一覧 */}

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