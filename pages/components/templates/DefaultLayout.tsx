import { Header } from "../organisms/header"
import { Footer } from "../organisms/footer"
import {
  Box
} from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Box 
        as="main"
        bg="gray.50"
        display="flex"
        flexDirection="column"
        flex="1"
      >
        {children}
      </Box>
      <Footer />
    </>
  )
}