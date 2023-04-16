export const getTagsQuery = `query getTags {
  tags(first: 10) {
    nodes {
      name
      id
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`

export const getNextTagsQuery = `query getNextTags(
  $endCursor: String!
) {
  tags(first: 10, after: $endCursor) {
    nodes {
      name
      id
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`

export const getTagPosts = `query getTagPosts(
  $id: ID!
) {
  tag(id: $id, idType: ID) {
    id
    name
    contentNodes {
      nodes {
        ... on Post {
          id
          databaseId
          title
        }
      }
    }
  }
}`
