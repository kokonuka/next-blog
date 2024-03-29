import { PostFragment } from "@/gql/generated/graphql";
import { formatDate } from "@/lib/formatDate";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

type Props = {
  post: PostFragment;
};

const PostCardDate = (props: Props) => {
  const post = props.post;

  return (
    <Box display="flex" alignItems="center" gap="2">
      <Text color="blue.500" fontSize={{ base: "lg", md: "2xl" }}>
        <AiOutlineCalendar />
      </Text>
      <Text fontSize={{ base: "sm", md: "medium" }}>
        {formatDate(post?.date ?? "")}
      </Text>
    </Box>
  );
};

export default PostCardDate;
