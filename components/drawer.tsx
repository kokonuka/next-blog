import Link from "next/link"
import { useRouter } from "next/router"
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
          <DrawerBody>
            <Link href="/" onClick={handleClick}>
              <Text fontSize='lg'>
                Home
              </Text>
            </Link>
            <Link href="/posts" onClick={handleClick}>
              <Text fontSize='lg'>
                Posts
              </Text>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
  )
}