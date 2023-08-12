import { graphql } from "@/gql/generated";

export const getFirstPostQueryDocuments = graphql(`
  query getFirstPost {
    posts(first: 1) {
      nodes {
        ...Post
      }
    }
  }
`);
