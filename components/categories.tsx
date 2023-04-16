import { useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Box, Text } from '@chakra-ui/react'
import { getCategoriesQuery, getNextCategoriesQuery } from "../graphql/queries/categories"
import { fetchGraph, fetchGraphWithVariable } from "../graphql/fetchGraphql"
import { Category } from "../graphql/types/categories"

export default function Categories() {
  const [categories, setCategories] = useState([])
  const router = useRouter()

  const getCategories = async() => {
    const data = await fetchGraph(getCategoriesQuery)
    const filterdCategories = data.categories.nodes.filter((category: Category) => {
      return category.name != "未分類" ? true : false;
    })
    filterdCategories.sort((a: Category, b: Category) => a.name > b.name ? -1 : 1);
    setCategories(filterdCategories)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      {router.pathname !== "/search" && (
        <Box as="section" bg="white" position="sticky" top="0" zIndex="2">
          <Container maxW="6xl" position="relative">
            <Box className='categoriesWrap' display="flex" gap="7" w="100%" pt="2" pr="14" overflowX="scroll">
              {categories.length > 0 && categories.map((category: Category) => (
                // 現在のパスとカテゴリーIDが一致していたら
                // <Text fontWeight="bold" color="gray.600" borderBottom="2px solid" pb="3">
                //   <Link href="/">{category.name}</Link>
                // </Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.500" pb="3" whiteSpace="nowrap" key={category.id}>
                  <Link href={`/categories/${category.id}`}>{category.name}</Link>
                </Text>
              ))}
            </Box>
            <Box 
              position="absolute" 
              top="0" 
              right="4" 
              w="14"
              height="100%" 
              bg="linear-gradient(to left, white, #ffffff10)"
            >
            </Box>
          </Container>
        </Box>
      )}
    </>
  )
}