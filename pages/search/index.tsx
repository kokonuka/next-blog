import { Stack, Box, InputGroup, InputLeftElement, Input, VStack, } from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai";

export default function Index() {
  return (
    <Box bg="white" height="96" minH="100vh">
      <VStack mt="10">
        <VStack>
          <InputGroup >
            <InputLeftElement pointerEvents='none'>
              <AiOutlineSearch/>
            </InputLeftElement>
            <Input placeholder='Enter Keyword' borderRadius="20" />
          </InputGroup>
        </VStack>
      </VStack>
      <Box mt="10">
        タグ一覧
      </Box>
    </Box>
  )
}