import { useState, useEffect } from 'react'
import { Head } from './components/Head'
import type { NextPage } from 'next'
import { getDateDiff } from '../lib/getDateDiff'
import { ViewPost } from '../graphql/types/posts'
import { getPostsQuery } from '../graphql/queries/posts'
import { fetchGraph } from '../graphql/fetchGraphql'
import { HomeLayout } from './components/templates/HomeLayout'
import About from './components/about'
import { FlatPostList } from './components/organisms/FlatPostList'
import { PageLoading } from './components/organisms/PageLoading'

import { useQuery } from '@apollo/client'
import { graphql } from '../gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query getPosts {
    categories {
      nodes {
        id
        categoryId
        name
      }
      pageInfo {
        endCursor
      }
    }
  }
`)

type Props = {}

const fetchPosts = async () => {
  const data = await fetchGraph(getPostsQuery);
  return data.posts.nodes.map((post: ViewPost) => {
    post.dateDiff = getDateDiff(post.date);
    return post;
  });
}

const Home:NextPage<Props> = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const {data} = useQuery(allFilmsWithVariablesQueryDocument)
  console.log(data?.categories?.nodes[0].id)

  useEffect(() => {
    (async () => {
      const posts = await fetchPosts();
      setPosts(posts)
      setIsLoading(false)
    })();    
  }, [])
  
  return (
    <>
      <Head title='kimagurecode' description='Webエンジニアの備忘録' />
      <HomeLayout>
        <FlatPostList posts={posts} />
        <About />
        <PageLoading isLoading={isLoading} />
      </HomeLayout>
    </>
  )
}

export default Home;