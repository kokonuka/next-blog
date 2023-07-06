import { graphql } from "../../../gql";
import { Box } from "@chakra-ui/react";
import { HeadingWithDescription } from "../../molecules/HeadingWithDescription";
import { CategoryPostList } from "./CategoryPostList";
import { useQuery } from "@apollo/client";

type Props = {
  id: string;
};

export const categoryWithVariablesQueryDocument = graphql(`
  query categoryWithVariablesQuery($id: ID!) {
    category(id: $id, idType: ID) {
      id
      name
      description
    }
  }
`);

export const CategoryPosts: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery(
    categoryWithVariablesQueryDocument,
    { variables: { id } }
  );

  if (loading) return <p>読み込み中</p>;

  return (
    <Box as="section">
      <HeadingWithDescription
        text={data?.category?.name!}
        description={data?.category?.description!}
      />
      <CategoryPostList id={id} />
    </Box>
  );
};
