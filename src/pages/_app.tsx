import type { AppProps } from "next/app";
import Router from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/globals.css";
import "../styles/loader.css";
import "../styles/post.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/graphqlClient";
import { store } from "../redux/store";
import { Provider } from "react-redux";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  console.log("app hoge");
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </Provider>
  );
}
