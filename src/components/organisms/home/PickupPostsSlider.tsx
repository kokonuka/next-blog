import { useQuery } from "@apollo/client";
import { FragmentType } from "@/gql/generated";
import { useEffect, useState } from "react";
import { PostFragment } from "@/gql/fragments/post";
import { getPickupPostsQueryDocuments } from "@/gql/query/posts/getPickupPosts";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { PostsSlider } from "./PostsSlider";

export const PickupPostsSlider = () => {
  const { data, loading, error } = useQuery(getPickupPostsQueryDocuments);
  const [unsplashImages, setUnsplashImages] = useState([""]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=scenery&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY}`
      )
      .then((res) => {
        let unsplashImages: string[] = [];
        res.data.results.map((obj: any) => {
          unsplashImages.push(obj.urls.regular);
        });
        setUnsplashImages(unsplashImages);
      });
  }, [data]);

  if (error) return <Box>データの読み込みに失敗しました。</Box>;

  return (
    <Box as="section" mt="14" px={{ base: "2", lg: "0" }}>
      <Box>
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          Feature
        </Text>
      </Box>
      <Box mt="5">
        <PostsSlider
          posts={data?.posts?.nodes as FragmentType<typeof PostFragment>[]}
          loading={loading}
          unsplashImages={unsplashImages}
        />
      </Box>
    </Box>
  );
};
