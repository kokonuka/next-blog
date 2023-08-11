import { graphql } from "../../generated";

export const getFirstPostQueryDocuments = graphql(`
  query getFirstPost {
    posts(first: 1) {
      nodes {
        ...Post
      }
    }
  }
`);
