import { Header } from "../organisms/header"
import { Footer } from "../organisms/footer"
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
      <Container
        as="main"
        maxW="6xl"
        bg="gray.50"
        pt="10"
        display="flex"
        flexDirection="column"
        flex="1"
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}