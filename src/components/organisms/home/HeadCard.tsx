import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { load } from "cheerio";
import { Box, Link, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineCalendar, AiOutlineTag } from "react-icons/ai";
import { formatDate } from "@/lib/formatDate";
import { FragmentType, useFragment } from "@/gql/generated";
import { PostFragment } from "@/gql/fragments/post";
import LinkImage from "@/components/molecules/LinkImage";
import PostCardTags from "@/components/molecules/PostCardTags";

type Props = {
  post?: FragmentType<typeof PostFragment>;
  loading: boolean;
};

const HeadCard = (props: Props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;
  const [excerpt, setExcerpt] = useState("");

  useEffect(() => {
    const $ = load(post?.excerpt ?? "");
    $("a.more-link").remove();
    setExcerpt($.html());
  }, [post]);

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      border={useColorModeValue("0", "1px")}
      borderRight={{ base: "none", lg: useColorModeValue("0", "1px") }}
      borderLeft={{ base: "none", lg: useColorModeValue("0", "1px") }}
      borderRadius={{ base: "", lg: useColorModeValue("0", "base") }}
      borderColor={{
        base: useColorModeValue("gray.200", "gray.700"),
        lg: useColorModeValue("gray.200", "gray.700"),
      }}
      overflow="hidden"
    >
      <Skeleton isLoaded={!loading}>
        <Box pt={{ base: "60%", md: "50%" }} position="relative">
          {post && <LinkImage post={post} />}
        </Box>
      </Skeleton>
      <Box py={{ base: "5", md: "12" }} px="5">
        <Box>
          <Link as={NextLink} href={`/posts/${post?.databaseId}`}>
            <Text
              fontSize={{ base: "xl", md: "3xl" }}
              fontWeight="bold"
              lineHeight="1.8"
            >
              {post?.title}
            </Text>
          </Link>
        </Box>
        <Box mt="2" display="flex" gap="5">
          <Box display="flex" alignItems="center" gap="2">
            <Text color="blue.500" fontSize={{ base: "lg", md: "2xl" }}>
              <AiOutlineCalendar />
            </Text>
            <Text fontSize={{ base: "sm", md: "medium" }}>
              {formatDate(post?.date ?? "")}
            </Text>
          </Box>
          <Box display="flex" alignItems="center" gap="2">
            <PostCardTags tags={post?.tags?.nodes} />
          </Box>
        </Box>
        <Box
          mt={{ base: "5", lg: "8" }}
          fontSize={{ base: "sm", md: "medium" }}
          lineHeight="1.8"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </Box>
    </Box>
  );
};

export default HeadCard;
