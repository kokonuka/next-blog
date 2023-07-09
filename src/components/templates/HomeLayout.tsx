import { Header } from "../organisms/Header"
import { Footer } from "../organisms/Footer"
import { Mainvisual } from "../organisms/Mainvisual"
import {
  Container,
  Box
} from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Mainvisual />
      <Box bg="gray.50" >
        <Container
          as="main"
          maxW="6xl"
          pt="10"
          pb="36"
          display="flex"
          flexDirection="column"
          flex="1"
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </>
  )
}