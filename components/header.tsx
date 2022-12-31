import { useRef } from "react";
import Link from "next/link"
import {
  useDisclosure,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <header>
      <Box bg="white" display="flex" justifyContent="space-between">
        <Link href="/search">
          <AiOutlineSearch />
        </Link>
        <Link href="/">
          Hoge
        </Link>
        <Box ref={btnRef} onClick={onOpen}>
          <AiOutlineMenu />
        </Box>
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
          <DrawerFooter>
            hoge
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </header>
  )
}