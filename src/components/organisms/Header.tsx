import NextLink from "next/link";
import { Container, Box, Link } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <Box bg="white" py="2" as="header">
      <Container maxW="6xl" display="flex" justifyContent="space-between">
        <Box
          display="flex"
          alignItems="center"
          fontSize={{ base: "lg", md: "2xl" }}
          color="gray.800"
        >
          <Link
            as={NextLink}
            href="/"
            display="flex"
            alignItems="center"
            gap="2"
            _hover={{}}
          >
            <FaRegFileAlt />
            {process.env.SITE_TITLE || process.env.NEXT_PUBLIC_SITE_TITLE}
          </Link>
        </Box>
        <Box display="flex" alignItems="center" fontSize="2xl" color="gray.600">
          <Link as={NextLink} href="/search">
            <AiOutlineSearch />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
