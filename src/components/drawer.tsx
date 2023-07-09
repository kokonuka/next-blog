import Link from "next/link"
import { useRouter } from "next/router"
import {
  Text,
  Box,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { MutableRefObject } from "react"
import { BsInboxes } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";

type Props = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  btnRef: MutableRefObject<null>
}

export default function Drawer(props: Props) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if(router.pathname === e.currentTarget.pathname) return
    props.onClose()
  }

  return (
    <ChakraDrawer
        isOpen={props.isOpen}
        placement='right'
        onClose={props.onClose}
        finalFocusRef={props.btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody mt="5" display="flex" flexDirection="column" gap="3" color="blackAlpha.700">
            <Link href="/" onClick={handleClick}>
              <Box display="flex" alignItems="center" gap="2">
                <Box fontSize='xl'><RiHome2Line /></Box>
                <Box fontSize='lg' fontWeight="bold">Home</Box>
              </Box>
            </Link>
            <Link href="/posts" onClick={handleClick}>
              <Box display="flex" alignItems="center" gap="2">
                <Box fontSize='xl'><BsInboxes /></Box>
                <Box fontSize='lg' fontWeight="bold">Posts</Box>
              </Box>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
  )
}