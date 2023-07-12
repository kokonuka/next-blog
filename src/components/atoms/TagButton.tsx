import { Button, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { Tag } from "../../graphql/generate/graphql";

type Props = {
  tag: Tag;
};

export const TagButton: React.FC<Props> = ({ tag }) => {
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
