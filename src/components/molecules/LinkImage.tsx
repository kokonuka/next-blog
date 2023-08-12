import Image from "next/image";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostFragment } from "@/gql/generated/graphql";
import { isSvgUrl } from "@/lib/isSvgUrl";

type Props = {
  post: PostFragment;
};

const LinkImage = (props: Props) => {
  const post = props.post;
  const mediaItemUrl = post?.featuredImage?.node.mediaItemUrl;
  const defaultPostImage = "https://source.unsplash.com/random";

  return (
    <>
      <Link
        as={NextLink}
        href={`/posts/${post?.databaseId}`}
        position="absolute"
        top="0"
        h="100%"
        w="100%"
        _hover={{ bg: "white" }}
        opacity="0.2"
        zIndex="1"
      ></Link>
      <Image
        src={mediaItemUrl ?? defaultPostImage}
        alt="post"
        fill
        style={{
          objectFit:
            mediaItemUrl && isSvgUrl(mediaItemUrl) ? "contain" : "cover",
        }}
      />
    </>
  );
};

export default LinkImage;
