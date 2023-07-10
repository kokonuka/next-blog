import NextLink from "next/link";
import { Container, Box, Text, Link } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaRegFileAlt, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box as="footer" bg="gray.700">
      <Container maxW="6xl">
        <Box py="7" display="flex" justifyContent="space-between">
          <Box>
            <Link
              as={NextLink}
              href="/"
              display="flex"
              alignItems="center"
              gap="2"
              color="white"
              _hover={{}}
            >
              <FaRegFileAlt />
              {process.env.SITE_TITLE || process.env.NEXT_PUBLIC_SITE_TITLE}
            </Link>
          </Box>
          <Box color="whiteAlpha.900" display="flex" gap="4">
            <Link
              href="https://twitter.com/sunrise_web_dev"
              target="_blank"
              fontSize="2xl"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://twitter.com/sunrise_web_dev"
              target="_blank"
              fontSize="2xl"
            >
              <AiOutlineTwitter />
            </Link>
          </Box>
        </Box>
        <Box py="3">
          <Text fontSize="xs" textAlign="center" color="whiteAlpha.600">
            © 2023 Sun Blog All Rights Reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
