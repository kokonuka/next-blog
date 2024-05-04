import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import { Container, Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Container
        maxW="4xl"
        pt={{ base: '12', lg: '20' }}
        pb="14"
        px={{ base: '10', lg: '0' }}
        flex="1"
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};
