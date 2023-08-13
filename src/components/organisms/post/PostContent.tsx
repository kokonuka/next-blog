import React, { useEffect } from "react";
import { FragmentType } from "@/gql/generated";
import { PostPageFragment } from "@/gql/generated/graphql";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Prism from "prismjs";
import { PostImage } from "./PostImage";
import { Tags } from "./Tags";
import { Header } from "./Header";
import { TagButtonFragment } from "@/components/atoms/TagButton";

type Props = {
  post: PostPageFragment;
  content: string;
};

const PostContent = ({ post, content }: Props) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, [post]);

  return (
    <Box
      border={useColorModeValue("", "1px")}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={useColorModeValue("", "lg")}
    >
      <PostImage post={post} />
      <Header
        title={post.title ? post.title : ""}
        date={post.date ? post.date : ""}
      />
      <Tags
        tags={post.tags?.nodes as FragmentType<typeof TagButtonFragment>[]}
      />
      <Box
        dangerouslySetInnerHTML={{ __html: content }}
        className="znc"
        py="10"
      ></Box>
    </Box>
  );
};

export default PostContent;
