import React from "react";
import { FragmentType } from "@/gql/generated";
import { Box, Text } from "@chakra-ui/react";
import { AiOutlineTag } from "react-icons/ai";
import NewLinkTag from "../atoms/NewLinkTag";
import { TagFragment } from "../atoms/TagLink";

type Props = {
  tags?: FragmentType<typeof TagFragment>[];
};

const PostCardTags = (props: Props) => {
  const tags = props.tags;

  if (!tags) return <></>;
  if (tags.length === 0) return <></>;

  return (
    <Box display="flex" alignItems="center" gap="2">
      <Text fontSize={{ base: "lg", md: "2xl" }} color="rgba(255, 255, 255, 0.443)">
        <AiOutlineTag />
      </Text>
      <Box display="flex" flexWrap="wrap">
        {tags?.map((tag, i) => (
          <>
            <NewLinkTag tag={tag} key={i} />
            <Text pr="2" mt="-1px">
              {tags.length - 1 !== i && ""}
            </Text>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default PostCardTags;
