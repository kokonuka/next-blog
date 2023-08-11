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
        pt={{ base: "0", lg: "14" }}
        px={{ base: "0", lg: "8" }}
        pb="14"
        display={{ base: "block", lg: "flex" }}
        flex="1"
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
