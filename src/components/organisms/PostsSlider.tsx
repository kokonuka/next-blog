import React from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Card, PostFragment } from "../molecules/Card";
import { FragmentType } from "../../gql";
import { Box } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

type Props = {
  posts?: FragmentType<typeof PostFragment>[];
  loading: boolean;
};

export const PostsSlider: React.FC<Props> = ({ posts, loading }) => {
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
            1280: {},
            992: {
              perPage: 2,
              perMove: 2,
              arrows: false,
              padding: { left: "0", right: "3rem" },
              gap: 10,
            },
            768: {
              perPage: 1,
              perMove: 1,
              arrows: false,
              padding: { left: "0", right: "3rem" },
              gap: 10,
            },
            480: {
              perPage: 1,
              perMove: 1,
              arrows: false,
              padding: { left: "0", right: "3rem" },
              gap: 10,
            },
          },
        }}
      >
        <SplideTrack>
          {loading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SplideSlide key={index}>
                  <Card loading={loading} />
                </SplideSlide>
              ))}
            </>
          ) : (
            posts?.map((post, i) => (
              <SplideSlide key={i}>
                <Card post={post} loading={loading} />
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
