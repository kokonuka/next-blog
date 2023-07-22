import { Box } from "@chakra-ui/react";
import { PostPageFragment as PostPageFragmentType } from "@/gql/graphql";
import { Tags } from "./Tags";
import { FragmentType } from "@/gql";
import { TagButtonFragment } from "@/components/atoms/TagButton";

type Props = {
  post: PostPageFragmentType;
  content: string;
};

export const Content: React.FC<Props> = ({ post, content }) => {
  return (
    <Box
      width={{ base: "100%", lg: "70%" }}
      bg="white"
      p="5"
      borderRadius={{ base: "0", lg: "10" }}
      py="10"
    >
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
