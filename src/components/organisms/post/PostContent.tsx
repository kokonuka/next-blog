import React, { useEffect } from "react";
import { PostPageFragment } from "@/gql/generated/graphql";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Prism from "prismjs";
import { PostImage } from "./PostImage";
import { AiOutlineCalendar } from "react-icons/ai";
import PostCardTags from "@/components/molecules/PostCardTags";
import { formatDate } from "@/lib/formatDate";

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
      <Box px={{ base: "4", lg: "0" }}>
        <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold">
          {post.title}
        </Text>
        <Box mt="2" display="flex" gap="5">
          <Box display="flex" alignItems="center" gap="2">
            <Text color="blue.500" fontSize={{ base: "lg", md: "2xl" }}>
              <AiOutlineCalendar />
            </Text>
            <Text fontSize={{ base: "sm", md: "medium" }}>
              {formatDate(post?.date ?? "")}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap="2">
            <PostCardTags tags={post?.tags?.nodes} />
          </Box>
        </Box>
      </Box>
      <Box mt="5">
        <PostImage post={post} />
      </Box>
      <Box px={{ base: "4", lg: "0" }}>
        <Box
          dangerouslySetInnerHTML={{ __html: content }}
          className="znc"
          py="10"
        ></Box>
      </Box>
    </Box>
  );
};

export default PostContent;
