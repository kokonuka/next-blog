import { Box } from "@chakra-ui/react";
import { TagButton, TagButtonFragment } from "@/components/atoms/TagButton";
import { FragmentType } from "@/gql";

type Props = {
  tags: FragmentType<typeof TagButtonFragment>[];
};

export const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap="2">
      {tags.map((tag, i) => (
        <TagButton tag={tag} key={i} />
      ))}
    </Box>
  );
};
