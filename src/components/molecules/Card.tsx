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
    <Box as="article" h="100%" bg="white" display="flex" flexDirection="column">
      <Box position="relative" h="200px" overflow="hidden">
        <Link
          as={NextLink}
          href={`/posts/${post.databaseId}`}
          h="100%"
          w="100%"
          position="absolute"
          _hover={{ bg: "white" }}
          opacity="0.2"
        ></Link>
        <Image
          objectFit="cover"
          w="100%"
          h="100%"
          src={post.featuredImage?.node?.mediaItemUrl || defaultPostImage}
          alt="article"
        />
      </Box>
      <Box px="3" py="5" flex="1" display="flex" flexDirection="column">
        <Box flex="1" minH="20">
          <Text fontSize="xs" fontWeight="bold" color="gray.400">
            {getFormattedDateTimeDiff(post.date!)}
          </Text>
          <Link
            as={NextLink}
            href={`/posts/${post.databaseId}`}
            mt="2"
            fontSize="xl"
            fontWeight="bold"
            _hover={{ color: "blackAlpha.600" }}
          >
            {post.title}
          </Link>
        </Box>
        <Box mt="4" display="flex" gap="3">
          {post.tags?.nodes.map((tag, i) => (
            <TagButton tag={tag} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
