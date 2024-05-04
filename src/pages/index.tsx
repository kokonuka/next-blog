import React from "react";
import { Head } from "../components/Head";
import type { NextPage } from "next";
import { HomeLayout } from "../components/templates/HomeLayout";
import { Box } from "@chakra-ui/react";
import TechPostList from "@/components/organisms/home/TechPostList";
import CheatSheetPostList from "@/components/organisms/home/CheatSheetPostList";

type Props = {};

const Home: NextPage<Props> = () => {
  return (
    <>
      <Head title="sun develop" description="Webエンジニアの備忘録" />
      <HomeLayout>
        <Box
          as="main"
        >
          <TechPostList />
          <CheatSheetPostList />
        </Box>
      </HomeLayout>
    </>
  );
};

export default Home;
