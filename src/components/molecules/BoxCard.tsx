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
import { getFormattedDateTimeDiff } from "../../lib/getFormattedDateTimeDiff";
import { TagLink } from "../atoms/TagLink";
import { PostFragment } from "@/gql/fragments/post";
import LinkImage from "./LinkImage";
import { formatDate } from "@/lib/formatDate";

type Props = {
  post?: FragmentType<typeof PostFragment>;
  loading: boolean;
  i: number;
  unsplashImages: string[];
};

export const BoxCard: React.FC<Props> = (props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;
  const i = props.i;
  const unsplashImages = props.unsplashImages;
  const [unsplashImage, setdUnsplashImage] = useState("");
  const defaultImage = "https://source.unsplash.com/random";

  useEffect(() => {
    if (unsplashImages.length === 0) {
      setdUnsplashImage(defaultImage);
      return;
    }
    setdUnsplashImage(
      unsplashImages.length > i
        ? unsplashImages[i]
        : unsplashImages[unsplashImages.length - 1]
    );
  }, [i, unsplashImages]);

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
      borderRadius={useColorModeValue("", "base")}
      overflow="hidden"
    >
      <Skeleton isLoaded={!loading}>
        <Box pt="50%" position="relative">
          {post && (
            <LinkImage
              databaseId={post.databaseId}
              imageUrl={post.featuredImage?.node.mediaItemUrl ?? unsplashImage}
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
