import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { Box, Container } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const PostsLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Box as="main" bg="gray.50" flex="1">
        <Container maxW="6xl" pt="10" pb="36">
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
