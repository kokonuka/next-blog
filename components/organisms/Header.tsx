import { useRef } from "react";
import Link from "next/link"
import {
  useDisclosure,
  Container,
  Box,
} from '@chakra-ui/react'
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import Drawer from "../drawer";
import Categories from "../categories";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <Box bg="white" py="2" as="header">
        <Container maxW='6xl' display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" fontSize="2xl" color="gray.600">
            <Link href="/search"><AiOutlineSearch /></Link>
          </Box>
          <Box display="flex" alignItems="center" fontSize="2xl" color="gray.800">
            <Link href="/"><AiFillHome /></Link>
          </Box>
          <Box ref={btnRef} onClick={onOpen} display="flex" alignItems="center" fontSize="2xl" color="gray.600" cursor="pointer">
            <AiOutlineMenu />
          </Box>
        </Container>
      </Box>
      <Drawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} btnRef={btnRef} />
      <Categories />
    </>
  )
}