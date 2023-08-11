import React from "react";
import NextLink from "next/link";
import { TagItemFragment } from "@/gql/generated/graphql";
import { Box, Link } from "@chakra-ui/react";

type Props = {
  tags: TagItemFragment[];
};

const Tags = ({ tags }: Props) => {
  return (
    <Box display="flex" gap="3">
      {tags.length < 1 && (
        <Link as={NextLink} href={`/tags/${tags[0].id}`}>
          {tags[0].name}
        </Link>
      )}
      {tags.map((tag, i) => (
        <Link as={NextLink} href={`/tags/${tag?.id}`} key={i}>
          {tag.name},
        </Link>
      ))}
    </Box>
  );
};

export default Tags;
