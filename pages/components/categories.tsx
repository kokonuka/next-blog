import { useState, useEffect, useContext } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CategoryContext } from "../_app"
import { Container, Box, Text } from '@chakra-ui/react'
import { getCategoriesQuery } from "../../graphql/queries/categories"
import { fetchGraph } from "../../graphql/fetchGraphql"
import { Category } from "../../graphql/types/categories"

export default function Categories() {
  const { carrentCategoryId } = useContext(CategoryContext);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    ( async() => {
      const data = await fetchGraph(getCategoriesQuery);
      const filterdCategories = data.categories.nodes.filter((category: Category) =>  category.name != "未分類" ? true : false);
      filterdCategories.sort((a: Category, b: Category) => a.name > b.name ? -1 : 1);
      setCategories(filterdCategories);
    } )();
  }, []);

  return (
    <>
      {router.pathname !== "/search" && (
        <Box as="section" bg="white" position="sticky" top="0" zIndex="2" shadow="md">
          <Container maxW="6xl" position="relative">
            <Box className='categoriesWrap' display="flex" gap="7" w="100%" pt="2" pr="14" overflowX="scroll">
              {categories.length > 0 && categories.map((category: Category) => (
                <Box key={category.id}>
                  {carrentCategoryId == category.id ? (
                    <Text fontSize="sm" fontWeight="bold" color="gray.600" pb="3" whiteSpace="nowrap" borderBottom="2px solid" key={category.id}>
                      {category.name}
                    </Text>
                  ):(
                    <Text fontSize="sm" fontWeight="bold" color="gray.500" pb="3" whiteSpace="nowrap" key={category.id}>
                      <Link href={`/categories/${category.id}`}>{category.name}</Link>
                    </Text>
                  )}
                </Box>
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