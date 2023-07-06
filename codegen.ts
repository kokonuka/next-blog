import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_ENDPOINT,
  // documents: ['gql/query/*.graphql'],
  documents: ['components/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}'],
  // ignoreNoDocuments: true,
  generates: {
    "gql/": {
      preset: "client",
      plugins: []
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"]
    // }
  }
};

export default config;
