import React from "react";
import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { getCheatSheetPostsQueryDocuments } from "@/gql/query/posts/getCheatSheetPosts";
import { Box, Button, Text } from "@chakra-ui/react";
import FlatCard from "./FlatCard";

const CheatSheetPostList = () => {
  const { data, loading, error } = useQuery(getCheatSheetPostsQueryDocuments);

  if (error) return <Text>読み込めませんでした</Text>;

  return (
    <Box
      as="section"
      mt="14"
      bg="blackAlpha.200"
      py="10"
      px={{ base: "4", md: "10" }}
    >
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        textAlign="center"
      >
        CheaSheet
      </Text>
      <Box as="ul">
        {data?.posts?.nodes.map((post, i) => (
          <FlatCard post={post} loading={loading} key={i} />
        ))}
      </Box>
      <Box mt="10" textAlign="center">
        <Button
          as={NextLink}
          href={`/categories/dGVybTo1MQ==`}
          bg="black"
          color="white"
          borderRadius="3xl"
          fontWeight="bold"
          fontSize="sm"
          px="8"
          _hover={{ opacity: "0.7" }}
        >
          READ MORE →
        </Button>
      </Box>
    </Box>
  );
};

export default CheatSheetPostList;
