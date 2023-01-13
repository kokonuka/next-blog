import { useState } from "react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router';
import { ChakraProvider } from '@chakra-ui/react'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Layout from '../components/layout'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}
