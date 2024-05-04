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
import { FaRegFileAlt } from "react-icons/fa";
import { ColorSwitchButton } from "../molecules/ColorSwitchButton";
import { useCallback, useEffect, useState } from "react";

export const Header = () => {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);
  const headerHeight = 57;
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("gray.500", "gray.400");
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
        py="2"
        backdropFilter="blur(20px)"
      >
        <Container maxW="7xl" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Link
              as={NextLink}
              href="/"
              display="flex"
              alignItems="center"
              gap="2"
              _hover={{}}
            >
              <Box fontSize={{ base: "lg", md: "2xl" }}>
                <FaRegFileAlt />
              </Box>
              <Heading as="h1" fontSize={{ base: "lg", md: "2xl" }}>
                {process.env.SITE_TITLE || process.env.NEXT_PUBLIC_SITE_TITLE}
              </Heading>
            </Link>
          </Box>
          <Box display="flex" alignItems="center">
            <ColorSwitchButton aria-label={""} />
            <Button
              as={NextLink}
              href="/search"
              p="0"
              backgroundColor="inherit"
              fontSize="2xl"
              color={color}
              _hover={_hover}
            >
              <AiOutlineSearch />
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
