import { PostPageFragment } from "@/gql//generated/graphql";
import { Box, Container } from "@chakra-ui/react";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { Post } from "../organisms/post/Post";

type Props = {
  post: PostPageFragment;
  content: string;
};

export const PostLayout: React.FC<Props> = ({ post, content }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Box flex="1">
        <Container
          as="main"
          maxW="6xl"
          pt={{ base: "0", lg: "14" }}
          pb="16"
          px={{ base: "0", lg: "4" }}
          display="flex"
          flexDirection="column"
          flex="1"
        >
          <Post post={post} content={content} />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
