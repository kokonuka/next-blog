import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { FragmentType, graphql, useFragment } from "../../gql";
import { TagItemFragment } from "../../gql/graphql";

type Props = {
  tag: FragmentType<typeof TagFragment>;
};

export const TagFragment = graphql(`
  fragment TagItem on Tag {
    id
    name
  }
`);

export const TagButton: React.FC<Props> = (props) => {
  const tag = useFragment(TagFragment, props.tag);
  const router = useRouter();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: TagItemFragment
  ) => {
    event.preventDefault();
    router.push(`/tags/${tag?.id}`);
  };

  return (
    <Button
      fontSize="sm"
      color="blue.400"
      w="auto"
      h="auto"
      p="0"
      bg="inherit"
      _hover={{ textDecoration: "underline" }}
      onClick={(event) => handleClick(event, tag)}
    >
      #{tag?.name}
    </Button>
  );
};
