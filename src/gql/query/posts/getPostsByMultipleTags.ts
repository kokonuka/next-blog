import { graphql } from "@/gql/generated";

export const getPostsByMultipleTagsQueryDocuments = graphql(`
  query getPostsByMultipleTags($tagSlugs: [String]!) {
    posts(where: { tagSlugIn: $tagSlugs }) {
      nodes {
        ...Post
      }
    }
  }
`);
