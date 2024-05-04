import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { ColorSwitchButton } from "../molecules/ColorSwitchButton";
import { useCallback, useEffect, useState } from "react";

export const Header = () => {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);
  const headerHeight = 57;
  const _hover = { color: useColorModeValue("gray.600", "gray.500") };

  const scrollEvent = useCallback(() => {
    const offset = window.pageYOffset; // ビューポートの上部の位置

    if (offset > headerHeight) {
      setIsHeaderShown(false);
    } else {
      setIsHeaderShown(true);
    }

    if (offset < lastPosition) {
      setIsHeaderShown(true);
    }

    setLastPosition(offset);
  }, [lastPosition]);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100%"
      transform={isHeaderShown ? "translateY(0%)" : "translateY(-100%)"}
      transition="all 0.1s ease-in"
      zIndex="1"
    >
      <Box
        as="header"
        backdropFilter="blur(20px)"
      >
        <Box pt="1" display="flex" justifyContent="space-between" alignItems="center">
          <Link
            as={NextLink}
            href="/"
            _hover={{}}
          >
            <Heading as="h1" px="4" fontSize="medium" fontWeight="normal">
              {process.env.SITE_TITLE || process.env.NEXT_PUBLIC_SITE_TITLE}
            </Heading>
          </Link>
          <Box display="flex" alignItems="center" pr="2">
            <Button
              as={NextLink}
              href="/search"
              p="0"
              backgroundColor="inherit"
              fontSize="2xl"
              _hover={_hover}
            >
              <AiOutlineSearch />
            </Button>
            <ColorSwitchButton aria-label={""} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
