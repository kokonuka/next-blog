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

export const Header = () => {
  return (
    <Box
      as="header"
      bg={useColorModeValue("white", "rgba(0, 0, 0, 0.1)")}
      py="2"
      position="sticky"
      top="0"
      zIndex="1000"
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
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
            color={useColorModeValue("gray.500", "gray.400")}
            _hover={{ color: useColorModeValue("gray.600", "gray.500") }}
          >
            <AiOutlineSearch />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
