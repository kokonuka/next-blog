import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_ENDPOINT,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
