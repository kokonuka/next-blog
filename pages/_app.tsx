import type { AppProps } from 'next/app';
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import { useState, createContext, Dispatch, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/graphqlClient';

export const CategoryContext = createContext({} as {
  carrentCategoryId: string
  setCarrentCategoryId: Dispatch<React.SetStateAction<string>>
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  const [carrentCategoryId, setCarrentCategoryId] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(!router.pathname.includes("/categories")) setCarrentCategoryId("");
  }, [pageProps]);

  return (
    <CategoryContext.Provider value={{ carrentCategoryId, setCarrentCategoryId }} >
      <ChakraProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </CategoryContext.Provider>
  );
};
