import React from "react";
import { Head } from "../components/Head";
import type { NextPage } from "next";
import { HomeLayout } from "../components/templates/HomeLayout";
import { AboutUs } from "../components/organisms/AboutUs";
import { CategoryPostsSlider } from "../components/organisms/CategoryPostsSlider";
import { PageLoading } from "../components/organisms/PageLoading";
import { LoadingContextProvider } from "../context/LoadingContext";

type Props = {};

const Home: NextPage<Props> = () => {
  return (
    <>
      <Head title="sun develop" description="Webエンジニアの備忘録" />
      <LoadingContextProvider>
        <HomeLayout>
          <CategoryPostsSlider name="Tech" />
          <CategoryPostsSlider name="CheatSheet" />
          <AboutUs />
          <PageLoading />
        </HomeLayout>
      </LoadingContextProvider>
    </>
  );
};

export default Home;
