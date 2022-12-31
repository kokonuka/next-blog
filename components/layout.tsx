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
      <main>
        <Box bg="blue.50" minH="100vh">
          {children}
        </Box>
      </main>
      <Footer />
    </>
  )
}