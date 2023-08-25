import { Box, Container } from "@chakra-ui/react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

type Props = {
  children: React.ReactNode;
};

export const PostLayout = ({ children }: Props) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Box flex="1">
        <Container
          maxW="7xl"
          pt={{ base: "calc(2.5rem + 57px)", lg: "calc(3.5rem + 57px)" }}
          pb="14"
          px={{ base: "0", lg: "4" }}
          display={{ base: "block", lg: "flex" }}
        >
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
