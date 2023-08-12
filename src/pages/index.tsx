import React from "react";
import { Head } from "../components/Head";
import type { NextPage } from "next";
import { HomeLayout } from "../components/templates/HomeLayout";
import { Profile } from "../components/organisms/Profile";
import { CategoryPostsSlider } from "../components/organisms/CategoryPostsSlider";
import { Box } from "@chakra-ui/react";
import TopPost from "@/components/organisms/home/TopPost";
import TechPostList from "@/components/organisms/home/TechPostList";
import { PickupPostsSlider } from "@/components/organisms/home/PickupPostsSlider";

type Props = {};

const Home: NextPage<Props> = () => {
  return (
    <>
      <Head title="sun develop" description="Webエンジニアの備忘録" />
      <HomeLayout>
        <Box
          as="main"
          width={{ base: "100%", lg: "calc(100% - 320px)" }}
          pr={{ base: "0", lg: "40px", xl: "80px" }}
        >
          <TopPost />
          <Box px={{ base: "4", lg: "0" }}>
            <PickupPostsSlider />
            <TechPostList />
            <CategoryPostsSlider name="CheatSheet" />
          </Box>
        </Box>
        <Box mt={{ base: "14", lg: "0" }} w={{ base: "100%", lg: "320px" }}>
          <Profile />
        </Box>
      </HomeLayout>
    </>
  );
};

export default Home;
