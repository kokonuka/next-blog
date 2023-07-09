import React from "react";
import NextLink from "next/link";
import { Box, Text, Image, Link } from "@chakra-ui/react";
import { FragmentType, graphql, useFragment } from "../../gql";
import { getFormattedDateTimeDiff } from "../../lib/getFormattedDateTimeDiff";
import { TagButton } from "../atoms/TagButton";

type Props = {
  post: FragmentType<typeof PostFragment>;
};

export const PostFragment = graphql(`
  fragment PostItem on Post {
    id
    databaseId
    title
    date
    content
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    categories {
      nodes {
        id
        name
      }
    }
    tags {
      nodes {
        ...TagItem
      }
    }
  }
`);

export const Card: React.FC<Props> = (props) => {
  const post = useFragment(PostFragment, props.post);
  const defaultPostImage = "/images/default_post_image.jpg";

  return (
    <Box as="article">
      <Link as={NextLink} href={`/posts/${post.databaseId}`} _hover={{}}>
        <Box position="relative" h="200px" borderRadius="3xl" overflow="hidden">
          <Image
            objectFit="cover"
            w="100%"
            h="100%"
            src={post.featuredImage?.node?.mediaItemUrl || defaultPostImage}
            alt="article"
          />
        </Box>
        <Box px="3">
          <Text mt="4" fontSize="xs" fontWeight="bold" color="gray.400">
            {getFormattedDateTimeDiff(post.date!)}
          </Text>
          <Text mt="2" fontSize="xl" fontWeight="bold">
            {post.title}
          </Text>
          <Box mt="4" display="flex" gap="3">
            {post.tags?.nodes.map((tag, i) => (
              <TagButton tag={tag} key={i} />
            ))}
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
