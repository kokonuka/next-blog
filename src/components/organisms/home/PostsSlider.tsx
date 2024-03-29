import React from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { PostFragment } from "@/gql/fragments/post";
import { FragmentType } from "@/gql/generated";
import { Box } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { SliderCard } from "./SliderCard";

type Props = {
  posts?: FragmentType<typeof PostFragment>[];
  loading: boolean;
  unsplashImages: string[];
};

export const PostsSlider: React.FC<Props> = ({
  posts,
  loading,
  unsplashImages,
}) => {
  return (
    <Box px={{ base: "0" }}>
      <Splide
        hasTrack={false}
        aria-label=""
        options={{
          perPage: 3,
          perMove: 3,
          arrows: true,
          rewind: false,
          waitForTransition: false,
          rewindByDrag: false,
          padding: { left: "0", right: "0" },
          gap: 20,
          breakpoints: {
            1280: {
              perPage: 2,
              perMove: 2,
              gap: 10,
            },
            992: {
              perPage: 3,
              perMove: 3,
              arrows: false,
              padding: { left: "0", right: "0" },
              gap: 8,
            },
            768: {
              perPage: 2,
              perMove: 2,
              arrows: false,
              padding: { left: "0", right: "3rem" },
              gap: 8,
            },
            480: {
              perPage: 2,
              perMove: 2,
              arrows: false,
              padding: { left: "0", right: "3rem" },
              gap: 8,
            },
          },
        }}
      >
        <SplideTrack>
          {loading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SplideSlide key={index}>
                  <SliderCard
                    loading={loading}
                    unsplashImages={unsplashImages}
                  />
                </SplideSlide>
              ))}
            </>
          ) : (
            posts?.map((post, i) => (
              <SplideSlide key={i}>
                <SliderCard
                  post={post}
                  loading={loading}
                  i={i}
                  unsplashImages={unsplashImages}
                />
              </SplideSlide>
            ))
          )}
        </SplideTrack>
        <div className="splide__arrows">
          <button
            className="splide__arrow splide__arrow--prev"
            style={{ width: "3em", height: "3em" }}
          >
            <FaAngleRight />
          </button>
          <button
            className="splide__arrow splide__arrow--next"
            style={{ width: "3em", height: "3em" }}
          >
            <FaAngleRight />
          </button>
        </div>
        <ul
          className="splide__pagination"
          style={{ position: "static", marginTop: "10px" }}
        ></ul>
      </Splide>
    </Box>
  );
};
