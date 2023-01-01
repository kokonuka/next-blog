import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Box, Text } from '@chakra-ui/react'

export default function Categories() {
  const router = useRouter()
  if(router.pathname === "/search") return null

  return (
    <Box bg="white" position="sticky" top="0" zIndex="2">
      <Container maxW="6xl">
        <Box className='categoriesWrap' display="flex" gap="7" w="100%" pt="2" overflowX="scroll">
          <Text fontWeight="bold" color="gray.600" borderBottom="2px solid" pb="3">
            <Link href="/">Category1</Link>
          </Text>
          <Text fontWeight="bold" color="gray.500" pb="3">
            <Link href="/">Category2</Link>
          </Text>
          <Text fontWeight="bold" color="gray.500" pb="3">
            <Link href="/">Category3</Link>
          </Text>
          <Text fontWeight="bold" color="gray.500" pb="3">
            <Link href="/">Category4</Link>
          </Text>
          <Text fontWeight="bold" color="gray.500" pb="3">
            <Link href="/">Category5</Link>
          </Text>
        </Box>
      </Container>
    </Box>
  )
}