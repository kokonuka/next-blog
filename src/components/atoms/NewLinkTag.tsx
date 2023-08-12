import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { FragmentType, useFragment } from "@/gql/generated";
import { TagFragment } from "./TagLink";

type Props = {
  tag: FragmentType<typeof TagFragment>;
};

const NewLinkTag = (props: Props) => {
  const tag = useFragment(TagFragment, props.tag);

  return (
    <Link
      as={NextLink}
      href={`/tags/${tag?.id}`}
      fontSize={{ base: "sm", md: "medium" }}
    >
      {tag.name}
    </Link>
  );
};

export default NewLinkTag;
