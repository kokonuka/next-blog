import { Box, useColorModeValue } from "@chakra-ui/react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";

type Props = {
  children: React.ReactNode;
};

export const SearchLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Box
        as="main"
        pt="10"
        bg={useColorModeValue("white", "gray.800")}
        flex="1"
        display="flex"
        flexDirection="column"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
