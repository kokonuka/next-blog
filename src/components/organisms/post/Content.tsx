import { useEffect } from "react";
import "zenn-content-css";
import { PostPageFragment as PostPageFragmentType } from "@/gql/generated/graphql";
import { FragmentType } from "@/gql/generated";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Prism from "prismjs";
import { Tags } from "./Tags";
import { TagButtonFragment } from "@/components/atoms/TagButton";

type Props = {
  post: PostPageFragmentType;
  content: string;
};

export const Content: React.FC<Props> = ({ post, content }) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, [post]);

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
