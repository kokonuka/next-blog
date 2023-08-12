import React, { useEffect, useState } from "react";
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
  i?: number;
  unsplashImages: string[];
};

export const SliderCard: React.FC<Props> = (props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;
  const i = props.i;
  const unsplashImages = props.unsplashImages;
  const defaultImage = "https://source.unsplash.com/random";

  const getUnsplashImage = () => {
    if (!i) return "";
    if (unsplashImages.length === 0) {
      return defaultImage;
    }
    return unsplashImages.length > i
      ? unsplashImages[i]
      : unsplashImages[unsplashImages.length - 1];
  };

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
        <Box pt="60%" position="relative">
          {post && (
            <LinkImage
              databaseId={post.databaseId}
              imageUrl={
                post.featuredImage?.node.mediaItemUrl ?? getUnsplashImage()
              }
            />
          )}
        </Box>
      </Skeleton>
      <Box px="3" pt="5" pb="9">
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
