import { ReactNode } from "react";
import { Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

import Header from './header'
import Categories from './categories'
import Footer from './footer'

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Categories />
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