import React, { useEffect, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { PostFragment, TagItemFragment } from "@/gql/generated/graphql";
import { load } from "cheerio";
import { Box, Link, Text } from "@chakra-ui/react";
import { AiOutlineCalendar, AiOutlineTag } from "react-icons/ai";
import { formatDate } from "@/lib/formatDate";
import Tags from "@/components/molecules/Tags";

type Props = {
  post: PostFragment;
};

const HeadCard = ({ post }: Props) => {
  const [excerpt, setExcerpt] = useState("");

  console.log(post);

  useEffect(() => {
    const $ = load(post.excerpt ?? "");
    $("a.more-link").remove();
    setExcerpt($.html());
  }, [post]);

  return (
    <Box>
      <Link as={NextLink} href={`/posts/${post.databaseId}`}>
        <Box
          w="100%"
          paddingTop="50%"
          position="relative"
          _hover={{ opacity: "0.8" }}
        >
          <Image
            src={post.featuredImage?.node.mediaItemUrl ?? ""}
            alt="post"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Link>
      <Box mt="12">
        <Link as={NextLink} href={`/posts/${post.databaseId}`}>
          <Text fontSize="3xl" fontWeight="bold" lineHeight="1.8">
            {post.title}
          </Text>
        </Link>
      </Box>
      <Box mt="2" display="flex" gap="5">
        <Box display="flex" alignItems="center" gap="2">
          <Text color="blue.500" fontSize="2xl">
            <AiOutlineCalendar />
          </Text>
          <Text>{formatDate(post.date ?? "")}</Text>
        </Box>
        <Box display="flex" alignItems="center" gap="2">
          <Text color="blue.500" fontSize="2xl">
            <AiOutlineTag />
          </Text>
          <Tags tags={post.tags?.nodes as TagItemFragment[]} />
        </Box>
      </Box>
      <Box mt="8" dangerouslySetInnerHTML={{ __html: excerpt }} />
    </Box>
  );
};

export default HeadCard;
