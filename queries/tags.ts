export const getTagsQuery = `query getTags {
  tags(first: 10) {
    nodes {
      name
      tagId
    }
    pageInfo {
      endCursor
    }
  }
}`

export const getNextTagsQuery = `query getNextTags(
  $endCursor: String!
) {
  tags(first: 10, after: $endCursor) {
    nodes {
      name
      tagId
    }
    pageInfo {
      endCursor
    }
  }
}`