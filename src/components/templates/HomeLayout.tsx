import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { Mainvisual } from "../organisms/Mainvisual";
import { Container, Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Mainvisual />
      <Box flex="1">
        <Container
          as="main"
          maxW="6xl"
          pb="20"
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
