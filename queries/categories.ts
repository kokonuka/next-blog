export const getCategoriesQuery = `query getCategories {
  categories(first: 6) {
    nodes {
      name
      categoryId
    }
    pageInfo {
      endCursor
    }
  }
}`

export const getNextCategoriesQuery = `query getNextCategories(
  $endCursor: String!
) {
  categories(first: 10, after: $endCursor) {
    nodes {
      name
      categoryId
    }
    pageInfo {
      endCursor
    }
  }
}`