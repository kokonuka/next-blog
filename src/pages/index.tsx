import React from "react";
import { Head } from "../components/Head";
import type { NextPage } from "next";
import { HomeLayout } from "../components/templates/HomeLayout";
import { AboutUs } from "../components/organisms/AboutUs";
import { CategoryPostsSlider } from "../components/organisms/CategoryPostsSlider";
import { Box } from "@chakra-ui/react";
import TopPost from "@/components/organisms/home/TopPost";

type Props = {};

const Home: NextPage<Props> = () => {
  return (
    <>
      <Head title="sun develop" description="Webエンジニアの備忘録" />
      <HomeLayout>
        <Box as="main" w="calc(100% - 320px)" pr="80px">
          <TopPost />
          <CategoryPostsSlider name="Tech" />
          <CategoryPostsSlider name="CheatSheet" />
        </Box>
        <Box w="320px">
          <AboutUs />
        </Box>
      </HomeLayout>
    </>
  );
};

export default Home;
