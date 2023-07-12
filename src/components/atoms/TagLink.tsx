import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { FragmentType, graphql, useFragment } from "../../gql";

type Props = {
  tag: FragmentType<typeof TagFragment>;
};

export const TagFragment = graphql(`
  fragment TagItem on Tag {
    id
    name
  }
`);

export const TagLink: React.FC<Props> = (props) => {
  const tag = useFragment(TagFragment, props.tag);

  return (
    <Link
      as={NextLink}
      href={`/tags/${tag?.id}`}
      fontSize="sm"
      color="blue.400"
      w="auto"
      h="auto"
      p="0"
      bg="inherit"
      _hover={{ textDecoration: "underline" }}
    >
      #{tag?.name}
    </Link>
  );
};
