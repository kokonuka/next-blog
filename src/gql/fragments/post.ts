import { graphql } from "../generated";

export const PostFragment = graphql(`
  fragment Post on Post {
    id
    databaseId
    title
    date
    excerpt
    content
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    categories {
      nodes {
        id
        name
      }
    }
    tags {
      nodes {
        ...TagItem
      }
    }
  }
`);
