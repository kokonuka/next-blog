import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/graphql";
import { graphql } from "@/gql";
import { Headings } from "../../../pages/posts/[id]";
import { SideMenu } from "../SideMenu";
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
  headings: Headings[];
};

export const Post: React.FC<Props> = ({ post, content, headings }) => {
  return (
    <>
      <Header
        title={post.title ? post.title : ""}
        date={post.date ? post.date : ""}
      />
      <Box mt="10" display={{ base: "block", lg: "flex" }}>
        <Content post={post} content={content} />
        <SideMenu headings={headings} />
      </Box>
    </>
  );
};
