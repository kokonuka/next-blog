import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { Box, Container } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const SearchLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Box bg="white" flex="1">
        <Container
          as="main"
          maxW="6xl"
          pt="10"
          pb="36"
          display="flex"
          flexDirection="column"
          flex="1"
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
