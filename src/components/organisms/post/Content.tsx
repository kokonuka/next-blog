import { PostPageFragment as PostPageFragmentType } from "@/gql/graphql";
import { FragmentType } from "@/gql";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Tags } from "./Tags";
import { TagButtonFragment } from "@/components/atoms/TagButton";

type Props = {
  post: PostPageFragmentType;
  content: string;
};

export const Content: React.FC<Props> = ({ post, content }) => {
  return (
    <Box
      width={{ base: "100%", lg: "70%" }}
      bg={useColorModeValue("white", "gray.800")}
      p="5"
      py="10"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={{ base: "0", lg: "lg" }}
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
