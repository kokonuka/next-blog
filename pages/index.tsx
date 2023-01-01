import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Box, Text } from '@chakra-ui/react'
import { Blocks } from 'react-loader-spinner'

import Hero from '../components/hero'
import CardList from '../components/cardList'

export default function Home() {
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
    loading.current?.classList.add("active")
    setTimeout(() => {
      loadingWrap.current?.classList.remove("active")
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }, 3000)
    sessionStorage.setItem(keyName, "true")
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Container maxW="6xl">
        <section>
          <Box py="10">
            <Text fontSize="3xl" fontWeight="bold" py="3">New Posts</Text>
            <CardList />
            <Link href="/posts">記事をもっと見る</Link>
          </Box>
        </section>
        <section>
          <Box height="96">
            自己紹介
          </Box>
        </section>
        <section>
          <Box height="96">
            Twitterカード
          </Box>
        </section>
        <section>
          <Box height="96">
            タグ一覧
          </Box>
        </section>
      </Container>
      {isLoading && (
        <Box 
          ref={loadingWrap} 
          className="loadingWrap active" 
          position="absolute" top="0" w="100%" h="100vh" bg="white" display="flex" justifyContent="center" alignItems="center" zIndex="1"
        >
          <Box ref={loading} className='loading'>
            <Blocks
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </Box>
        </Box>
      )}
    </>
  )
}
