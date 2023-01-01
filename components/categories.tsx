import { Tabs, TabList, Tab, Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Categories() {
  const router = useRouter()

  if(router.pathname === "/search") return null

  return (
    <Tabs bg="white" position="sticky" top="0" zIndex="1">
      <Container maxW="6xl">
      <TabList>
        <Tab>Category1</Tab>
        <Tab>Category2</Tab>
        <Tab>Category3</Tab>
        <Tab>Category4</Tab>
        <Tab>Category5</Tab>
      </TabList>
      </Container>
    </Tabs>
  )
}