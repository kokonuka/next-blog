import React from "react";
import { Box } from "@chakra-ui/react";
import NewLinkTag from "../atoms/NewLinkTag";
import { FragmentType } from "@/gql/generated";
import { TagFragment } from "../atoms/TagLink";

type Props = {
  tags?: FragmentType<typeof TagFragment>[];
};

const Tags = ({ tags }: Props) => {
  const res = tags?.length;
  return (
    <Box display="flex" gap="3">
      {tags && tags.length < 1 ? (
        <NewLinkTag tag={tags[0]} />
      ) : (
        tags?.map((tag, i) => <NewLinkTag tag={tag} key={i} />)
      )}
    </Box>
  );
};

export default Tags;
