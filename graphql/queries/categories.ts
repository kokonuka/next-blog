export const getCategoriesQuery = `query getCategories {
  categories {
    nodes {
      id
      categoryId
      name
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`

export const getNextCategoriesQuery = `query getNextCategories(
  $endCursor: String!
) {
  categories(first: 10, after: $endCursor) {
    nodes {
      id
      name
      categoryId
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`

export const getCategory = `query getCategory(
  $id: ID!
) {
  category(id: $id, idType: ID) {
    id
    name
    categoryId
    description
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