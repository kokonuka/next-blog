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
      py="7"
      bg={useColorModeValue("white", "gray.900")}
      borderTop={useColorModeValue("none", "1px")}
      borderColor="gray.700"
    >
      <Container maxW="7xl">
        <Box>
          <Text fontSize="xs" textAlign="center">
            © 2023 Sun Blog All Rights Reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
