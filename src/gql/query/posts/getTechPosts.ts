import { graphql } from "@/gql/generated";

export const getTechPostsQueryDocuments = graphql(`
  query getTechPosts {
    posts(where: { categoryName: "tech" }) {
      nodes {
        ...Post
      }
    }
  }
`);
