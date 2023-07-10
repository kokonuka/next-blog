import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { Box, Container, Text } from "@chakra-ui/react";
import { Post, Tag } from "../../graphql/generate/graphql";
import { IdsWithHeadings } from "../../pages/posts/[id]";
// import styles from "../../styles/Post.module.css";
import { SideMenu } from "../organisms/SideMenu";
import { Tags } from "../organisms/Tags";
import { formatDate } from "@/lib/formatDate";

type Props = {
  post: Post;
  content: string;
  idsWithHeadings: IdsWithHeadings[];
};

export const PostLayout: React.FC<Props> = ({
  post,
  content,
  idsWithHeadings,
}) => {
  const tags = post?.tags?.nodes as Tag[];

  return (
    <>
      <Header />
      <Box bg="gray.50">
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
          <Box p="5">
            <Text
              fontSize={{ base: "2xl", lg: "4xl" }}
              fontWeight="bold"
              color="gray.700"
              textAlign="center"
            >
              {post.title}
            </Text>
            <Text mt="5" color="gray.500" textAlign="center">
              {formatDate(post.date!)}
            </Text>
          </Box>
          <Box mt="10" display={{ base: "block", lg: "flex" }}>
            <Box
              width={{ base: "100%", lg: "70%" }}
              bg="white"
              p="5"
              borderRadius={{ base: "0", lg: "10" }}
              py="10"
            >
              <Tags tags={tags} />
              <div
                className={`post znc`}
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </Box>
            <Box
              display={{ base: "none", lg: "block" }}
              width={{ base: "100%", lg: "30%" }}
              pl="5"
            >
              <SideMenu idsWithHeadings={idsWithHeadings} />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};
