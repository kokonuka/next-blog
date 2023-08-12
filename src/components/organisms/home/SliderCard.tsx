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
import { getFormattedDateTimeDiff } from "../../../lib/getFormattedDateTimeDiff";
import { TagLink } from "../../atoms/TagLink";
import { PostFragment } from "@/gql/fragments/post";
import LinkImage from "../../molecules/LinkImage";

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
      display="flex"
      flexDirection="column"
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
      <Box px="3" py="5" flex="1" display="flex" flexDirection="column">
        <Box>
          <SkeletonText isLoaded={!loading}>
            <Text fontSize="xs" fontWeight="bold" color="gray.400">
              {getFormattedDateTimeDiff(post?.date! || "")}
            </Text>
            <Link
              as={NextLink}
              href={`/posts/${post?.databaseId}`}
              mt="1"
              fontSize={{ base: "medium", md: "xl" }}
              fontWeight="bold"
              display="inline-block"
              _hover={{ opacity: "0.4" }}
            >
              {post?.title}
            </Link>
          </SkeletonText>
        </Box>
        <Box
          mt={{ base: "2", md: "4" }}
          display="flex"
          columnGap="3"
          flexWrap="wrap"
        >
          {post?.tags?.nodes.map((tag, i) => (
            <TagLink tag={tag} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
