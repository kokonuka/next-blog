import { graphql } from "@/gql/generated";

export const getCheatSheetPostsQueryDocuments = graphql(`
  query getCheatSheetPosts {
    posts(where: { categoryName: "cheatsheet" }, first: 3) {
      nodes {
        ...Post
      }
    }
  }
`);
