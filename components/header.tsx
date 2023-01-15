import { useRef } from "react";
import Link from "next/link"
import {
  useDisclosure,
  Container,
  Box,
  Text,
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { BiCodeBlock } from "react-icons/bi";
import { TiCodeOutline } from "react-icons/ti";
import { FaLaptopCode } from "react-icons/fa";
import { GoCode } from "react-icons/go";

import Drawer from "./drawer";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Box bg="white" py="2" as="header">
        <Container maxW='6xl' display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" fontSize="2xl" color="gray.600">
            <Link href="/search"><AiOutlineSearch /></Link>
          </Box>
          <Box display="flex" alignItems="center" fontSize="3xl" color="gray.800">
            <Link href="/"><GoCode /></Link>
          </Box>
          <Box ref={btnRef} onClick={onOpen} display="flex" alignItems="center" fontSize="2xl" color="gray.600" cursor="pointer">
            <AiOutlineMenu />
          </Box>
        </Container>
      </Box>
      <Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} btnRef={btnRef} />
    </>
  )
}