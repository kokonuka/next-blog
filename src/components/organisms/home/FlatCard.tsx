import React from "react";
import { PostFragment } from "@/gql/fragments/post";
import { FragmentType, useFragment } from "@/gql/generated";
import { Box, Skeleton, Text } from "@chakra-ui/react";
import PostCardDate from "@/components/molecules/PostCardDate";
import PostCardTags from "@/components/molecules/PostCardTags";
import LinkImage from "@/components/molecules/LinkImage";

type Props = {
  post: FragmentType<typeof PostFragment>;
  loading: boolean;
};

const FlatCard = (props: Props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;

  return (
    <Box
      borderBottom="1px"
      borderColor="gray.300"
      display={{ base: "", md: "flex" }}
      py="10"
    >
      <Skeleton isLoaded={!loading}>
        <Box
          w={{ base: "100%", md: "200px" }}
          paddingTop="50%"
          position="relative"
        >
          {post && <LinkImage post={post} />}
        </Box>
      </Skeleton>
      <Box mt={{ base: "5", md: "0" }} pl={{ base: "0", md: "10" }}>
        <Text fontWeight="bold" fontSize="xl" lineHeight="1.8">
          {post.title}
        </Text>
        <Box mt="2" display="flex">
          <Box pr="2">
            <PostCardDate post={post} />
          </Box>
          <PostCardTags tags={post.tags?.nodes} />
        </Box>
      </Box>
    </Box>
  );
};

export default FlatCard;
