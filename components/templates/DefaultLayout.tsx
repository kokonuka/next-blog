import { Header } from "../organisms/Header"
import { Footer } from "../organisms/Footer"
import { Box, Container } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

// Todo: ボディーの最低高さの設定

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
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