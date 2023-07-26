import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Box,
  Text,
  Link,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { FragmentType, graphql, useFragment } from "../../gql";
import { getFormattedDateTimeDiff } from "../../lib/getFormattedDateTimeDiff";
import { TagLink } from "../atoms/TagLink";

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

type Props = {
  post?: FragmentType<typeof PostFragment>;
  loading: boolean;
};

export const Card: React.FC<Props> = (props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;
  const defaultPostImage = "https://source.unsplash.com/random";
  const mediaItemUrl = post?.featuredImage?.node?.mediaItemUrl;

  return (
    <Box
      as="article"
      h="100%"
      bg={useColorModeValue("white", "gray.800")}
      display="flex"
      flexDirection="column"
      cursor="pointer"
      border={useColorModeValue("", "1px")}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={useColorModeValue("", "lg")}
    >
      <Box position="relative" h="200px" overflow="hidden">
        <Skeleton isLoaded={!loading} h="100%">
          <Link
            as={NextLink}
            href={`/posts/${post?.databaseId}`}
            h="100%"
            w="100%"
            position="absolute"
            _hover={{ bg: "white" }}
            opacity="0.2"
          ></Link>
          <Image
            src={mediaItemUrl || defaultPostImage}
            alt="article"
            width={1980}
            height={1150}
            style={{
              width: "100%",
              height: "200px",
              objectFit: mediaItemUrl ? "contain" : "cover",
            }}
          />
        </Skeleton>
      </Box>
      <Box px="3" py="5" flex="1" display="flex" flexDirection="column">
        <Box flex="1" minH="20">
          <SkeletonText isLoaded={!loading}>
            <Text fontSize="xs" fontWeight="bold" color="gray.400">
              {getFormattedDateTimeDiff(post?.date! || "")}
            </Text>
            <Link
              as={NextLink}
              href={`/posts/${post?.databaseId}`}
              mt="1"
              fontSize="xl"
              fontWeight="bold"
              display="inline-block"
              _hover={{ opacity: "0.4" }}
            >
              {post?.title}
            </Link>
          </SkeletonText>
        </Box>
        <Box mt="4" display="flex" gap="3" flexWrap="wrap">
          {post?.tags?.nodes.map((tag, i) => (
            <TagLink tag={tag} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
