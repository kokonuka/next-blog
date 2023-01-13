import { useRef } from "react";
import Link from "next/link"
import {
  useDisclosure,
  Container,
  Box,
  Text,
} from '@chakra-ui/react'
import { IconContext } from "react-icons/lib";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";

import Drawer from "./drawer";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <header>
      <Box bg="white" py="2">
        <Container maxW='6xl' display="flex" justifyContent="space-between">
          <IconContext.Provider value={{ size: '25px' }}>
            <Link href="/search">
              <AiOutlineSearch />
            </Link>
            <Link href="/">
              <Text fontSize='lg' fontWeight="bold">
                Hoge
              </Text>
            </Link>
            <Box ref={btnRef} onClick={onOpen} cursor="pointer">
              <AiOutlineMenu />
            </Box>
          </IconContext.Provider>
        </Container>
      </Box>
      <Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} btnRef={btnRef} />
    </header>
  )
}