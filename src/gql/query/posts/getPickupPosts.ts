import { graphql } from "@/gql/generated";

export const getPickupPostsQueryDocuments = graphql(`
  query getPickupPosts {
    posts(where: { categoryName: "pickup" }) {
      nodes {
        ...Post
      }
    }
  }
`);
