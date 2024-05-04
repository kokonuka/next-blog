import {
  Container,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box
      as="footer"
      py="7"
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
