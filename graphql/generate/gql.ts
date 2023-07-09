/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment postFragment on Post {\n  databaseId\n  title\n  date\n  content\n  featuredImage {\n    node {\n      mediaItemUrl\n    }\n  }\n  categories {\n    nodes {\n      id\n      databaseId\n      name\n    }\n  }\n  tags {\n    nodes {\n      id\n      databaseId\n      name\n    }\n  }\n}\n\nquery GetPosts {\n  posts {\n    nodes {\n      ...postFragment\n    }\n  }\n}\n\nquery getNextPosts($endCursor: String!) {\n  posts(first: 10, after: $endCursor) {\n    nodes {\n      ...postFragment\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nquery getPost($id: ID!) {\n  post(id: $id, idType: DATABASE_ID) {\n    ...postFragment\n  }\n}":
    types.PostFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment postFragment on Post {\n  databaseId\n  title\n  date\n  content\n  featuredImage {\n    node {\n      mediaItemUrl\n    }\n  }\n  categories {\n    nodes {\n      id\n      databaseId\n      name\n    }\n  }\n  tags {\n    nodes {\n      id\n      databaseId\n      name\n    }\n  }\n}\n\nquery GetPosts {\n  posts {\n    nodes {\n      ...postFragment\n    }\n  }\n}\n\nquery getNextPosts($endCursor: String!) {\n  posts(first: 10, after: $endCursor) {\n    nodes {\n      ...postFragment\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nquery getPost($id: ID!) {\n  post(id: $id, idType: DATABASE_ID) {\n    ...postFragment\n  }\n}"
): (typeof documents)["fragment postFragment on Post {\n  databaseId\n  title\n  date\n  content\n  featuredImage {\n    node {\n      mediaItemUrl\n    }\n  }\n  categories {\n    nodes {\n      id\n      databaseId\n      name\n    }\n  }\n  tags {\n    nodes {\n      id\n      databaseId\n      name\n    }\n  }\n}\n\nquery GetPosts {\n  posts {\n    nodes {\n      ...postFragment\n    }\n  }\n}\n\nquery getNextPosts($endCursor: String!) {\n  posts(first: 10, after: $endCursor) {\n    nodes {\n      ...postFragment\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nquery getPost($id: ID!) {\n  post(id: $id, idType: DATABASE_ID) {\n    ...postFragment\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
