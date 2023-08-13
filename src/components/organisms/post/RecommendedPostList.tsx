import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  GetPostsByMultipleTagsQuery,
  PostFragment,
  PostPageFragment,
  TagButtonFragment,
} from "@/gql/generated/graphql";
import { getPostsByMultipleTagsQueryDocuments } from "@/gql/query/posts/getPostsByMultipleTags";
import { useQuery } from "@apollo/client";
import FlatCard from "../home/FlatCard";
import axios from "axios";
import PickupPostList from "./PickupPostList";

type Props = {
  post: PostPageFragment;
};

const RecommendedPostList = ({ post }: Props) => {
  const [unsplashImages, setUnsplashImages] = useState([""]);

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=tech&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESSKEY}`
      )
      .then((res) => {
        let unsplashImages: string[] = [];
        res.data.results.map((obj: any) => {
          unsplashImages.push(obj.urls.regular);
        });
        setUnsplashImages(unsplashImages);
      });
  }, []);

  const tagSlugs = post.tags?.nodes.map((tag) => {
    const fixedTag = tag as TagButtonFragment;
    return fixedTag.name ?? "";
  });

  const { data, loading, error } = useQuery(
    getPostsByMultipleTagsQueryDocuments,
    {
      variables: {
        tagSlugs: tagSlugs ?? [""],
      },
    }
  );

  if (error) return <Text>読み込めませんでした</Text>;

  const isPosts = (data: GetPostsByMultipleTagsQuery | undefined): boolean => {
    const hoge = data?.posts?.nodes.filter((tagPost) => {
      const fixedPost = tagPost as PostFragment;
      return fixedPost.databaseId !== post.databaseId;
    }).length;
    return !hoge ? false : true;
  };

  return (
    <Box as="section" mt="14" p="10" bg="blackAlpha.200">
      <Text
        fontSize={{ base: "lg", md: "2xl" }}
        fontWeight="bold"
        textAlign="center"
      >
        RECOMMENDED
      </Text>
      <Box>
        {isPosts(data) ? (
          data?.posts?.nodes.map((post, i) => (
            <FlatCard
              post={post}
              loading={loading}
              i={i}
              unsplashImages={unsplashImages}
              key={i}
            />
          ))
        ) : (
          <PickupPostList />
        )}
      </Box>
    </Box>
  );
};

export default RecommendedPostList;
