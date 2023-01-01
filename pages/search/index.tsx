import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { 
  VStack, 
  Container, 
  Box, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Tag,
  Text
} from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai";

import CardList from "../../components/cardList";

const queryFunc = (keyword: string | string[] | undefined) => {
  return `query getPosts {
    posts(where: {search: "${keyword}"}) {
      nodes {
        id
        postId
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
}

export default function Index() {
  const [value, setValue] = useState("")
  const [posts, setPosts] = useState([])
  const router = useRouter();
  const { q } = router.query

  const fetchPosts = async () => {
    let query = queryFunc(q)
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ query }),
      },
    )
    const data = await response.json()
    setPosts(data.data.posts.nodes)
  }

  useEffect(() => {
    if(q) {
      fetchPosts()
    }
  }, [q])

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
    <Box bg="white">
      <Container maxW="6xl" minH="100vh">
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
        {!q ? (
          <Box mt="10">
            <Text fontWeight="bold">Tags</Text>
            <Box mt="5" display="flex" flexWrap="wrap" gap="3">
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
              <Tag>Sample Tag</Tag>
            </Box>
          </Box>
        ) : (
          <Box mt="10">
            <CardList posts={posts}/>
          </Box>
        )}
      </Container>
    </Box>
  )
}