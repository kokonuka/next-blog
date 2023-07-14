import NextLink from "next/link";
import { FragmentType, graphql, useFragment } from "@/gql";
import { Link } from "@chakra-ui/react";

export const TagButtonFragment = graphql(`
  fragment TagButton on Tag {
    id
    name
  }
`);

type Props = {
  tag: FragmentType<typeof TagButtonFragment>;
};

export const TagButton: React.FC<Props> = (props) => {
  const tag = useFragment(TagButtonFragment, props.tag);

  return (
    <Link
      as={NextLink}
      href={`/tags/${tag.id}`}
      py="2"
      px="5"
      fontWeight="medium"
      fontSize="sm"
      border="1px"
      borderColor="gray.300"
      borderRadius="3xl"
      bg="inherit"
      _hover={{ backgroundColor: "gray.100" }}
    >
      {tag.name}
    </Link>
  );
};
