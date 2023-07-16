import { PostPageFragment } from "@/gql/graphql";
import { Box, Container } from "@chakra-ui/react";
import { Headings } from "../../pages/posts/[id]";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { Post } from "../organisms/post/Post";

type Props = {
  post: PostPageFragment;
  content: string;
  headings: Headings[];
};

export const PostLayout: React.FC<Props> = ({ post, content, headings }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Header />
      <Box bg="blackAlpha.50" flex="1">
        <Container
          as="main"
          maxW="6xl"
          pt="10"
          pb="36"
          px={{ base: "0", lg: "4" }}
          display="flex"
          flexDirection="column"
          flex="1"
        >
          <Post post={post} content={content} headings={headings} />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
