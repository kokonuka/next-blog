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
      <Box flex="1">
        <Container as="main" maxW="7xl" pt="10" pb="36">
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
