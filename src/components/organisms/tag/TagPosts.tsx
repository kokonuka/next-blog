import { graphql } from "@/gql/generated";
import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Heading } from "../../atoms/Heading";
import { TagPostList } from "./TagPostList";

type Props = {
  id: string;
};

export const tagWithVariablesQueryDocument = graphql(`
  query tagWithVariablesQuery($id: ID!) {
    tag(id: $id, idType: ID) {
      id
      name
      description
    }
  }
`);

export const TagPosts: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery(tagWithVariablesQueryDocument, {
    variables: { id },
  });

  if (loading) return <p>読み込み中</p>;

  return (
    <Box as="section">
      <Heading text={data?.tag?.name!} />
      <TagPostList id={id} />
    </Box>
  );
};
