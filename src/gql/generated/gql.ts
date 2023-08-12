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
    "\n  fragment TagButton on Tag {\n    id\n    name\n  }\n": types.TagButtonFragmentDoc,
    "\n  fragment TagItem on Tag {\n    id\n    name\n  }\n": types.TagItemFragmentDoc,
    "\n  query categoryWhereCategoryNameQuery($name: [String]) {\n    categories(where: { name: $name }) {\n      nodes {\n        id\n        name\n        posts {\n          nodes {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n": types.CategoryWhereCategoryNameQueryDocument,
    "\n  query allPostsWithVariablesQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsWithVariablesQueryDocument,
    "\n  query allPostsWithCategoryQuery($categoryIn: [ID], $endCursor: String!) {\n    posts(where: { categoryIn: $categoryIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsWithCategoryQueryDocument,
    "\n  query categoryWithVariablesQuery($id: ID!) {\n    category(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n": types.CategoryWithVariablesQueryDocument,
    "\n  fragment PostPage on Post {\n    id\n    title\n    date\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        databaseId\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagButton\n      }\n    }\n  }\n": types.PostPageFragmentDoc,
    "\n  query postsWhereSearchQuery($keyword: String!, $endCursor: String!) {\n    posts(where: { search: $keyword }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.PostsWhereSearchQueryDocument,
    "\n  query allTagsQuery($endCursor: String!) {\n    tags(first: 10, after: $endCursor) {\n      nodes {\n        ...TagButton\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllTagsQueryDocument,
    "\n  query allPostsByTagIdWithVariablesQuery($tagIn: [ID], $endCursor: String!) {\n    posts(where: { tagIn: $tagIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsByTagIdWithVariablesQueryDocument,
    "\n  query tagWithVariablesQuery($id: ID!) {\n    tag(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n": types.TagWithVariablesQueryDocument,
    "\n  fragment Post on Post {\n    id\n    databaseId\n    title\n    date\n    excerpt\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagItem\n      }\n    }\n  }\n": types.PostFragmentDoc,
    "\n  query getCheatSheetPosts {\n    posts(where: { categoryName: \"cheatsheet\" }, first: 3) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n": types.GetCheatSheetPostsDocument,
    "\n  query getFirstPost {\n    posts(first: 1) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n": types.GetFirstPostDocument,
    "\n  query getPickupPosts {\n    posts(where: { categoryName: \"pickup\" }) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n": types.GetPickupPostsDocument,
    "\n  query getTechPosts {\n    posts(where: { categoryName: \"tech\" }) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n": types.GetTechPostsDocument,
    "\n  query allPostsQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        databaseId\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllPostsQueryDocument,
    "\n  query postQuery($id: ID!) {\n    post(id: $id, idType: DATABASE_ID) {\n      ...PostPage\n    }\n  }\n": types.PostQueryDocument,
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
export function graphql(source: "\n  fragment TagButton on Tag {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment TagButton on Tag {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagItem on Tag {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment TagItem on Tag {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoryWhereCategoryNameQuery($name: [String]) {\n    categories(where: { name: $name }) {\n      nodes {\n        id\n        name\n        posts {\n          nodes {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query categoryWhereCategoryNameQuery($name: [String]) {\n    categories(where: { name: $name }) {\n      nodes {\n        id\n        name\n        posts {\n          nodes {\n            ...Post\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsWithVariablesQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsWithVariablesQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsWithCategoryQuery($categoryIn: [ID], $endCursor: String!) {\n    posts(where: { categoryIn: $categoryIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsWithCategoryQuery($categoryIn: [ID], $endCursor: String!) {\n    posts(where: { categoryIn: $categoryIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoryWithVariablesQuery($id: ID!) {\n    category(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query categoryWithVariablesQuery($id: ID!) {\n    category(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostPage on Post {\n    id\n    title\n    date\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        databaseId\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagButton\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PostPage on Post {\n    id\n    title\n    date\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        databaseId\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagButton\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query postsWhereSearchQuery($keyword: String!, $endCursor: String!) {\n    posts(where: { search: $keyword }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query postsWhereSearchQuery($keyword: String!, $endCursor: String!) {\n    posts(where: { search: $keyword }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allTagsQuery($endCursor: String!) {\n    tags(first: 10, after: $endCursor) {\n      nodes {\n        ...TagButton\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allTagsQuery($endCursor: String!) {\n    tags(first: 10, after: $endCursor) {\n      nodes {\n        ...TagButton\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsByTagIdWithVariablesQuery($tagIn: [ID], $endCursor: String!) {\n    posts(where: { tagIn: $tagIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsByTagIdWithVariablesQuery($tagIn: [ID], $endCursor: String!) {\n    posts(where: { tagIn: $tagIn }, first: 10, after: $endCursor) {\n      nodes {\n        ...Post\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query tagWithVariablesQuery($id: ID!) {\n    tag(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query tagWithVariablesQuery($id: ID!) {\n    tag(id: $id, idType: ID) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Post on Post {\n    id\n    databaseId\n    title\n    date\n    excerpt\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagItem\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Post on Post {\n    id\n    databaseId\n    title\n    date\n    excerpt\n    content\n    featuredImage {\n      node {\n        mediaItemUrl\n      }\n    }\n    categories {\n      nodes {\n        id\n        name\n      }\n    }\n    tags {\n      nodes {\n        ...TagItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCheatSheetPosts {\n    posts(where: { categoryName: \"cheatsheet\" }, first: 3) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"): (typeof documents)["\n  query getCheatSheetPosts {\n    posts(where: { categoryName: \"cheatsheet\" }, first: 3) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFirstPost {\n    posts(first: 1) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"): (typeof documents)["\n  query getFirstPost {\n    posts(first: 1) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPickupPosts {\n    posts(where: { categoryName: \"pickup\" }) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPickupPosts {\n    posts(where: { categoryName: \"pickup\" }) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTechPosts {\n    posts(where: { categoryName: \"tech\" }) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTechPosts {\n    posts(where: { categoryName: \"tech\" }) {\n      nodes {\n        ...Post\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allPostsQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        databaseId\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allPostsQuery($endCursor: String!) {\n    posts(first: 10, after: $endCursor) {\n      nodes {\n        databaseId\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query postQuery($id: ID!) {\n    post(id: $id, idType: DATABASE_ID) {\n      ...PostPage\n    }\n  }\n"): (typeof documents)["\n  query postQuery($id: ID!) {\n    post(id: $id, idType: DATABASE_ID) {\n      ...PostPage\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;