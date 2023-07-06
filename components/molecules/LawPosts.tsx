import { Box } from "@chakra-ui/react";
import { CardFlat, PostFragment } from "../cardFlat";
import { FragmentType } from "../../gql";

type Props = {
  posts: FragmentType<typeof PostFragment>[];
};

export const LawPosts: React.FC<Props> = ({ posts }) => {
  return (
    <Box display="flex" flexDirection="column" gap="10">
      {posts.map((post, i) => (
        <CardFlat post={post} key={i} />
      ))}
    </Box>
  );
};
