export const getPostsQuery = `query getPosts (
  $count: Int
) {
  posts(first: $count) {
    nodes {
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
          databaseId
          name
        }
      }
      tags {
        nodes {
          databaseId
          name
        }
      }
    }
    pageInfo {
      endCursor
    }
  }
}`;

export const getNextPostsQuery = `query GetNextPosts (
  $endCursor: String!
)
{
  posts(after: $endCursor) {
    nodes {
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
          databaseId
          name
        }
      }
      tags {
        nodes {
          databaseId
          name
        }
      }
    }
    pageInfo {
      endCursor
    }
  }
}`;

export const getPostQuery = `query getPost(
  $id: ID!
) {
  post(id: $id, idType: DATABASE_ID) {
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
        databaseId
        name
      }
    }
    tags {
      nodes {
        databaseId
        name
      }
    }
  }
}`