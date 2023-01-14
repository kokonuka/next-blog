import { useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Box, Text } from '@chakra-ui/react'
import { getCategoriesQuery, getNextCategoriesQuery } from "../queries/categories"
import { fetchGraph, fetchGraphWithVariable } from "../lib/fetchGraphql"
import { Category } from "../types/categories"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const getCategories = async() => {
    const data = await fetchGraph(getCategoriesQuery)
    let categories = data.categories.nodes

    let flug = false
    let endCursor= data.categories.pageInfo.endCursor
    if(categories.length === 10) flug = true
    while(flug) {
      const data = await fetchGraphWithVariable(getNextCategoriesQuery, { "endCursor": endCursor })
      if(data.categories.nodes.length === 0) {
        flug = false
        break
      }
      categories = [...categories, ...data.categories.nodes]
      endCursor = data.categories.pageInfo.endCursor
    }

    setCategories(categories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      {router.pathname !== "/search" && (
        <Box 
          as="section"
          bg="white" 
          position="sticky" 
          top="0" 
          zIndex="2"
          >
          <Container maxW="6xl">
            <Box className='categoriesWrap' display="flex" gap="7" w="100%" pt="2" overflowX="scroll">
              {categories.length > 0 && categories.map((category: Category) => (
                // 現在のパスとカテゴリーIDが一致していたら
                // <Text fontWeight="bold" color="gray.600" borderBottom="2px solid" pb="3">
                //   <Link href="/">{category.name}</Link>
                // </Text>
                <Text fontWeight="bold" color="gray.500" pb="3" whiteSpace="nowrap" key={category.categoryId}>
                  <Link href="/">{category.name}</Link>
                </Text>
              ))}
            </Box>
          </Container>
        </Box>
      )}
    </>
  )
}