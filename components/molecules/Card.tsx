import Link from "next/link";
import { Box, Text, Image } from "@chakra-ui/react";
import React from "react";
import { FragmentType, graphql, useFragment } from "../../gql";
import { getFormattedDateTimeDiff } from "../../lib/getFormattedDateTimeDiff";

type Props = {
  post: FragmentType<typeof PostVerticalFragment>;
};

export const PostVerticalFragment = graphql(`
  fragment PostVerticalItem on Post {
    id
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
        id
        name
      }
    }
  }
`);

export const Card: React.FC<Props> = (props) => {
  const post = useFragment(PostVerticalFragment, props.post);
  const category = post?.categories?.nodes[0];
  const defaultPostImage = "/images/default_post_image.jpg";

  return (
    <>
      <Box
        as="article"
        bg="white"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        position="relative"
      >
        <Link href={`/posts/${post.id}`}>
          <Box position="relative" h="100px">
            <Image
              objectFit="cover"
              w="100%"
              h="100%"
              src={post.featuredImage?.node?.mediaItemUrl || defaultPostImage}
              alt="article"
            />
          </Box>
          <Box
            h="100px"
            pt="2"
            pb="3"
            px="3"
            display="flex"
            flexDirection="column"
          >
            <Text fontWeight="bold" flex="1">
              {post.title}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {getFormattedDateTimeDiff(post.date!)}
            </Text>
          </Box>
        </Link>
        <Link href={`/categories/${category?.id}`}>
          <Text
            top="2"
            left="2"
            py="1"
            px="2"
            bg="blue.500"
            borderRadius="24"
            fontSize="xs"
            color="white"
            position="absolute"
          >
            {category?.name}
          </Text>
        </Link>
      </Box>
    </>
  );
};
