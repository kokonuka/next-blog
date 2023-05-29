import React, { useState, useEffect } from 'react'
import { Head } from '../components/Head'
import type { NextPage } from 'next'
import { HomeLayout } from '../components/templates/HomeLayout'
import { AboutUs } from '../components/organisms/AboutUs'
import { NewPosts } from '../components/organisms/NewPosts'
import { PageLoading } from '../components/organisms/PageLoading'
import { LoadingContextProvider } from '../context/LoadingContext'

type Props = {}


const Home:NextPage<Props> = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])
  
  return (
    <>
      <Head title='sun develop' description='Webエンジニアの備忘録' />
      <LoadingContextProvider>
        <HomeLayout>
          <NewPosts />
          <AboutUs />
          <PageLoading />
        </HomeLayout>
      </LoadingContextProvider>
    </>
  )
}

export default Home;