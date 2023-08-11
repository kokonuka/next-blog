import { useEffect, useState } from "react";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { load } from "cheerio";
import { Link as Scroll } from "react-scroll";

type Props = {
  content: string;
};

export type Heading = {
  id: string;
  text: string;
  tagLevel: string;
};

export const SideMenu = ({ content }: Props) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const $ = load(typeof content === "string" ? content : "");
    let headings: Heading[] = [];
    const cheerioHeadings = $("h1, h2, h3, h4, h5, h6");

    cheerioHeadings.each((_, elm) => {
      const id = $(elm).attr("id") as string;
      const text = $(elm).text();
      const tagName = elm.tagName;
      const tagLevel = tagName.replace(/^h/, "");

      headings.push({
        id,
        text,
        tagLevel,
      });
    });

    setHeadings(headings);
  }, [content]);

  return (
    <Box
      pl="5"
      width={{ base: "100%", lg: "30%" }}
      display={{ base: "none", lg: "block" }}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        p="5"
        border={useColorModeValue("", "1px")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius={useColorModeValue("", "lg")}
      >
        <Heading as="h2" fontSize="xl">
          目次
        </Heading>
        <Box mt="5">
          {headings.map((heading, i) => (
            <Box mt="1" key={i} pl={`${heading.tagLevel}`}>
              <Box
                display="inline"
                cursor="pointer"
                _hover={{ opacity: "0.7" }}
              >
                <Scroll to={`${heading.id}`} smooth={true}>
                  {heading.text}
                </Scroll>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
