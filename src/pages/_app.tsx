import type { AppProps } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/graphqlClient";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/post.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
}
