/* eslint-disable jsx-a11y/alt-text */
import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/graphql";
import { graphql } from "@/gql";
import { Image } from "./Image";
import { SideMenu } from "./SideMenu";
import { Header } from "./Header";
import { Content } from "./Content";

export const PostPageFragment = graphql(`
  fragment PostPage on Post {
    id
    title
    date
    content
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    categories {
      nodes {
        id
        databaseId
        name
      }
    }
    tags {
      nodes {
        ...TagButton
      }
    }
  }
`);

type Props = {
  post: PostPageFragmentType;
  content: string;
};

export const Post: React.FC<Props> = ({ post, content }) => {
  return (
    <>
      <Image post={post} />
      <Header
        title={post.title ? post.title : ""}
        date={post.date ? post.date : ""}
      />
      <Box mt="14" display={{ base: "block", lg: "flex" }}>
        <Content post={post} content={content} />
        <SideMenu content={content} />
      </Box>
    </>
  );
};
