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
      <Container
        maxW="7xl"
        pt="14"
        pb="20"
        display={{ base: "block", lg: "flex" }}
        flex="1"
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
