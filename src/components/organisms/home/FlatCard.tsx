import React from "react";
import NextLink from "next/link";
import { PostFragment } from "@/gql/fragments/post";
import { FragmentType, useFragment } from "@/gql/generated";
import { Box, Skeleton, Link } from "@chakra-ui/react";
import PostCardDate from "@/components/molecules/PostCardDate";
import PostCardTags from "@/components/molecules/PostCardTags";
import PriorityLinkImage from "@/components/molecules/PriorityLinkImage";

type Props = {
  post: FragmentType<typeof PostFragment>;
  loading: boolean;
  i: number;
  unsplashImages: string[];
};

const FlatCard = (props: Props) => {
  const post = useFragment(PostFragment, props.post);
  const loading = props.loading;
  const i = props.i;
  const unsplashImages = props.unsplashImages;
  const defaultImage = "https://source.unsplash.com/random";

  const getUnsplashImage = () => {
    if (unsplashImages.length === 0) {
      return defaultImage;
    }
    return unsplashImages.length > i
      ? unsplashImages[i]
      : unsplashImages[unsplashImages.length - 1];
  };

  return (
    <Box
      borderBottom="1px"
      borderColor="gray.300"
      display={{ base: "", md: "flex" }}
      py="10"
    >
      <Skeleton isLoaded={!loading}>
        <Box
          w={{ base: "100%", md: "200px" }}
          paddingTop="50%"
          position="relative"
        >
          {post && (
            <PriorityLinkImage
              databaseId={post.databaseId}
              imageUrl={
                post.featuredImage?.node.mediaItemUrl ?? getUnsplashImage()
              }
            />
          )}
        </Box>
      </Skeleton>
      <Box mt={{ base: "5", md: "0" }} pl={{ base: "0", md: "10" }}>
        <Link
          as={NextLink}
          href={`/posts/${post.databaseId}`}
          fontWeight="bold"
          fontSize="xl"
          lineHeight="1.8"
        >
          {post.title}
        </Link>
        <Box mt="2" display="flex">
          <Box pr="2">
            <PostCardDate post={post} />
          </Box>
          <PostCardTags tags={post.tags?.nodes} />
        </Box>
      </Box>
    </Box>
  );
};

export default FlatCard;
