import { useRef } from "react";
import Link from "next/link"
import {
  useDisclosure,
  Container,
  Box,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { IconContext } from "react-icons/lib";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";

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
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            hoge
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </header>
  )
}