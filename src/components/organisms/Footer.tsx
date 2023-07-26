import NextLink from "next/link";
import {
  Container,
  Box,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegFileAlt } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box
      as="footer"
      bg={useColorModeValue("white", "gray.900")}
      borderTop="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Container maxW="6xl">
        <Box py="7" display="flex" justifyContent="space-between">
          <Box>
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
        </Box>
        <Box py="3">
          <Text fontSize="xs" textAlign="center">
            © 2023 Sun Blog All Rights Reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
