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
      <Text fontSize={{ base: "lg", md: "2xl" }} color="rgba(255, 255, 255, 0.443)">
        <AiOutlineCalendar />
      </Text>
      <Text fontSize={{ base: "xs", md: "medium" }}>
        {formatDate(post?.date ?? "")}
      </Text>
    </Box>
  );
};

export default PostCardDate;
