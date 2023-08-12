import React from "react";
import NextLink from "next/link";
import {
  Box,
  Text,
  Link,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { FragmentType, useFragment } from "@/gql/generated";
import { PostFragment } from "@/gql/fragments/post";
import LinkImage from "../../molecules/LinkImage";
import { formatDate } from "@/lib/formatDate";

type Props = {
  post?: FragmentType<typeof PostFragment>;
  loading: boolean;
};

export const SliderCard: React.FC<Props> = (props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;

  return (
    <Box
      as="article"
      h="100%"
      bg={useColorModeValue("white", "gray.800")}
      cursor="pointer"
      border={useColorModeValue("", "1px")}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius={useColorModeValue("", "base")}
      overflow="hidden"
    >
      <Skeleton isLoaded={!loading}>
        <Box
          pt={{ base: "50%", md: "60%", lg: "50%", xl: "60%" }}
          position="relative"
        >
          {post && <LinkImage post={post} />}
        </Box>
      </Skeleton>
      <Box px="3" pt="2" pb="5">
        <SkeletonText isLoaded={!loading}>
          <Box mt="1">
            <Link
              as={NextLink}
              href={`/posts/${post?.databaseId}`}
              mt="1"
              fontSize={{ base: "medium", md: "xl" }}
              fontWeight="bold"
              _hover={{ opacity: "0.4" }}
            >
              {post?.title}
            </Link>
          </Box>
          <Text mt="4" fontSize="xs" fontWeight="bold" color="gray.600">
            {formatDate(post?.date ?? "")}
          </Text>
        </SkeletonText>
      </Box>
    </Box>
  );
};
