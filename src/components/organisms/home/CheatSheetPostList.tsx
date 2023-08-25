import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useQuery } from "@apollo/client";
import { getCheatSheetPostsQueryDocuments } from "@/gql/query/posts/getCheatSheetPosts";
import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import FlatCard from "./FlatCard";

const CheatSheetPostList = () => {
  const { data, loading, error } = useQuery(getCheatSheetPostsQueryDocuments);
  const [unsplashImages, setUnsplashImages] = useState([""]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=command&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY}`
      )
      .then((res) => {
        let unsplashImages: string[] = [];
        res.data.results.map((obj: any) => {
          unsplashImages.push(obj.urls.regular);
        });
        setUnsplashImages(unsplashImages);
      });
  }, []);

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
        Memo
      </Text>
      <Box as="ul">
        {data?.posts?.nodes.map((post, i) => (
          <FlatCard
            post={post}
            loading={loading}
            i={i}
            unsplashImages={unsplashImages}
            key={i}
          />
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
