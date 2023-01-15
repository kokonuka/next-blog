import { useState, useEffect } from "react"
import Head from "next/head";
import { useRouter } from 'next/router'
import { 
  VStack, 
  Container, 
  Box, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Tag as ChakraTag,
  Text
} from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai";
import { getTagsQuery, getNextTagsQuery } from "../../queries/tags";
import { fetchGraph, fetchGraphWithVariable } from "../../lib/fetchGraphql";
import CardList from "../../components/cardList";

import { Tag } from "../../types/tags";

const query = `query getPosts (
  $keyword: String
) {
  posts(where: {search: $keyword}) {
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
      categories {
        nodes {
          name
        }
      }
    }
  }
}`

export default function Index() {
  const [value, setValue] = useState("")
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const router = useRouter();
  const { q } = router.query

  const fetchPosts = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {keyword: q},
        }),
      },
    )
    const data = await response.json()
    setPosts(data.data.posts.nodes)
  }

  useEffect(() => {
    if(q) fetchPosts()
  }, [q])

  const getTags = async() => {
    const data = await fetchGraph(getTagsQuery)
    let tags = data.tags.nodes

    let flug = false
    let endCursor= data.tags.pageInfo.endCursor
    if(tags.length === 10) flug = true
    while(flug) {
      const data = await fetchGraphWithVariable(getNextTagsQuery, { "endCursor": endCursor })
      if(data.tags.nodes.length === 0) {
        flug = false
        break
      }
      tags = [...tags, ...data.tags.nodes]
      endCursor = data.tags.pageInfo.endCursor
    }

    setTags(tags)
  }

  useEffect(() => {
    getTags()
  })

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      router.push({
        pathname: "search",
        query: { q: value },
      });
    }
  }

  return (
    <>
      <Head>
        <title>Search | kimagurecode</title>
        <meta name="description" content="駆け出しエンジニアの備忘録" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="white" flex="1">
        <Container maxW="6xl">
          <VStack mt="10">
            <VStack w={{ 
              base: "90%", 
              sm: "80%", 
              md: "70%",
              lg: "60%",
              xl: "50%",
            }}>
              <InputGroup >
                <InputLeftElement pointerEvents='none'>
                  <AiOutlineSearch/>
                </InputLeftElement>
                <Input
                  onChange={handleChange}
                  onKeyPress={handleSubmit}
                  value={value}
                  placeholder='Enter Keyword' 
                  borderRadius="20" 
                />
              </InputGroup>
            </VStack>
          </VStack>
          {!q && tags ? (
            <Box mt="10">
              <Text fontWeight="bold">Tags</Text>
              <Box mt="5" display="flex" flexWrap="wrap" gap="3">
                {tags.map((tag: Tag) => (
                  <ChakraTag key={tag.tagId}>{tag.name}</ChakraTag>
                ))}
              </Box>
            </Box>
          ) : (
            <Box mt="10">
              <CardList posts={posts}/>
            </Box>
          )}
        </Container>
      </Box>
    </>
  )
}