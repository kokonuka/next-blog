import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getPickupPostsQueryDocuments } from "@/gql/query/posts/getPickupPosts";
import { useQuery } from "@apollo/client";
import axios from "axios";
import FlatCard from "../home/FlatCard";

const PickupPostList = () => {
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
  }, []);

  const { data, loading, error } = useQuery(getPickupPostsQueryDocuments);

  if (error) return <Text>読み込めませんでした</Text>;

  return (
    <Box>
      {data?.posts?.nodes.map((post, i) => (
        <FlatCard
          post={post}
          loading={loading}
          i={i}
          key={i}
        />
      ))}
    </Box>
  );
};

export default PickupPostList;
