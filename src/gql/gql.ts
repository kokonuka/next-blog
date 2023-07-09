/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "\n  fragment TagItem on Tag {\n    id\n    name\n  }\n": types.TagItemFragmentDoc,
    "\n  fragment PostItem on Post {\n    id\n    databaseId\n    title\n    date\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagItem\n      }\n    }\n  }\n": types.PostItemFragmentDoc,
    "\n  query categoryWhereCategoryNameQuery($name: [String]) {\n    categories(where: { name: $name }) {\n      nodes {\n        id\n        name\n        posts {\n          nodes {\n            ...PostItem\n          }\n        }\n      }\n    }\n  }\n": types.CategoryWhereCategoryNameQueryDocument,
    "\n  query allPostsWithVariablesQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsWithVariablesQueryDocument,
    "\n  query allPostsWithCategoryQuery($categoryIn: [ID], $endCursor: String!) {\n    posts(where: { categoryIn: $categoryIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsWithCategoryQueryDocument,
    "\n  query categoryWithVariablesQuery($id: ID!) {\n    category(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n": types.CategoryWithVariablesQueryDocument,
    "\n  query allPostsByTagIdWithVariablesQuery($tagIn: [ID], $endCursor: String!) {\n    posts(where: { tagIn: $tagIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsByTagIdWithVariablesQueryDocument,
    "\n  query tagWithVariablesQuery($id: ID!) {\n    tag(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n": types.TagWithVariablesQueryDocument,
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
export function graphql(source: "\n  fragment TagItem on Tag {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment TagItem on Tag {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostItem on Post {\n    id\n    databaseId\n    title\n    date\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagItem\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PostItem on Post {\n    id\n    databaseId\n    title\n    date\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoryWhereCategoryNameQuery($name: [String]) {\n    categories(where: { name: $name }) {\n      nodes {\n        id\n        name\n        posts {\n          nodes {\n            ...PostItem\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query categoryWhereCategoryNameQuery($name: [String]) {\n    categories(where: { name: $name }) {\n      nodes {\n        id\n        name\n        posts {\n          nodes {\n            ...PostItem\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsWithVariablesQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsWithVariablesQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsWithCategoryQuery($categoryIn: [ID], $endCursor: String!) {\n    posts(where: { categoryIn: $categoryIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsWithCategoryQuery($categoryIn: [ID], $endCursor: String!) {\n    posts(where: { categoryIn: $categoryIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoryWithVariablesQuery($id: ID!) {\n    category(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query categoryWithVariablesQuery($id: ID!) {\n    category(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsByTagIdWithVariablesQuery($tagIn: [ID], $endCursor: String!) {\n    posts(where: { tagIn: $tagIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsByTagIdWithVariablesQuery($tagIn: [ID], $endCursor: String!) {\n    posts(where: { tagIn: $tagIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...PostItem\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query tagWithVariablesQuery($id: ID!) {\n    tag(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query tagWithVariablesQuery($id: ID!) {\n    tag(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;