import NextLink from "next/link";
import {
  Container,
  Box,
  Link,
  useColorMode,
  Heading,
  Button,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { ColorSwitchButton } from "../molecules/ColorSwitchButton";

export const Header = () => {
  return (
    <Box bg="white" py="2" as="header">
      <Container maxW="6xl" display="flex" justifyContent="space-between">
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
            <Heading
              as="h1"
              color="black.900"
              fontSize={{ base: "lg", md: "2xl" }}
            >
              {process.env.SITE_TITLE || process.env.NEXT_PUBLIC_SITE_TITLE}
            </Heading>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" color="gray.600" gap="3">
          <ColorSwitchButton aria-label={""} />
          <Button
            as={NextLink}
            href="/search"
            backgroundColor="inherit"
            fontSize="2xl"
            p="0"
          >
            <AiOutlineSearch />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
