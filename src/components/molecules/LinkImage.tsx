import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { isSvgUrl } from "@/lib/isSvgUrl";

type Props = {
  databaseId: number;
  imageUrl: string;
};

const LinkImage = ({ databaseId, imageUrl }: Props) => {
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
        sizes="(max-width:992px) 100vw,(max-width:1200px) 50vw, 33vw"
        style={{
          objectFit: isSvgUrl(imageUrl) ? "contain" : "cover",
        }}
      />
    </>
  );
};

export default LinkImage;
