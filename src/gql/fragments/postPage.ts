import { graphql } from "../generated";

export const PostPageFragment = graphql(`
  fragment PostPage on Post {
    id
    databaseId
    title
    date
    content
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    categories {
      nodes {
        id
        databaseId
        name
      }
    }
    tags {
      nodes {
        ...TagButton
      }
    }
  }
`);
