import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "@chakra-ui/react";
import { isSvgUrl } from "@/lib/isSvgUrl";

type Props = {
  databaseId: number;
  imageUrl: string;
};

const PriorityLinkImage = ({ databaseId, imageUrl }: Props) => {
  return (
    <>
      <Link
        as={NextLink}
        href={`/posts/${databaseId}`}
        position="absolute"
        top="0"
        h="100%"
        w="100%"
        _hover={{ bg: "white" }}
        opacity="0.2"
        zIndex="1"
      ></Link>
      <Image
        src={imageUrl}
        alt="post"
        fill
        priority
        sizes="(max-width:992px) 100vw,(max-width:1200px) 75vw, 50vw"
        style={{
          objectFit: isSvgUrl(imageUrl) ? "contain" : "cover",
        }}
      />
    </>
  );
};

export default PriorityLinkImage;
