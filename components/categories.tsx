import { Tabs, TabList, Tab, Container } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Categories() {
  const router = useRouter()

  if(router.pathname === "/search") return null

  return (
    <Tabs bg="white" position="sticky" top="0" zIndex="1">
      <Container maxW="6xl">
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
      </TabList>
      </Container>
    </Tabs>
  )
}