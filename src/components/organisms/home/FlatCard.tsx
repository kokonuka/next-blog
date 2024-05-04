import React from "react";
import NextLink from "next/link";
import { PostFragment } from "@/gql/fragments/post";
import { FragmentType, useFragment } from "@/gql/generated";
import { Box, Link } from "@chakra-ui/react";
import PostCardDate from "@/components/molecules/PostCardDate";
import PostCardTags from "@/components/molecules/PostCardTags";

type Props = {
  post: FragmentType<typeof PostFragment>;
  loading: boolean;
  i: number;
};

const FlatCard = (props: Props) => {
  const post = useFragment(PostFragment, props.post);
  const i = props.i;

  return (
    <Box
      py="10"
    >
      <Box mt={{ base: "5", md: "0" }} pl={{ base: "0", md: "10" }}>
        <Link
          as={NextLink}
          href={`/posts/${post.databaseId}`}
          fontWeight="bold"
          fontSize={{ base: "medium", md: "xl" }}
          lineHeight="1.8"
        >
          {post.title}
        </Link>
        <Box mt="2" display="flex" gap="5">
          <Box>
            <PostCardDate post={post} />
          </Box>
          <PostCardTags tags={post.tags?.nodes} />
        </Box>
      </Box>
    </Box>
  );
};

export default FlatCard;
