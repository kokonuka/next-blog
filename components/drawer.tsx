import Link from "next/link"
import {
  Text,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import { MutableRefObject } from "react"

type Props = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  btnRef: MutableRefObject<null>
}

export default function Drawer(props: Props) {

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
          <DrawerBody>
            <Link href="/">
              <Text fontSize='lg'>
                Home
              </Text>
            </Link>
            <Link href="/posts">
              <Text fontSize='lg'>
                Posts
              </Text>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
  )
}