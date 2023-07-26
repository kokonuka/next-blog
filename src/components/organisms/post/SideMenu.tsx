import { Box, useColorModeValue } from "@chakra-ui/react";
import { Link as Scroll } from "react-scroll";
import { Headings } from "../../../pages/posts/[id]";

type Props = {
  headings: Headings[];
};

export const SideMenu: React.FC<Props> = ({ headings }) => {
  return (
    <Box
      pl="5"
      width={{ base: "100%", lg: "30%" }}
      display={{ base: "none", lg: "block" }}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        p="5"
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="lg"
      >
        <p>目次</p>
        {headings.map((id) => (
          <Box key={id.id}>
            <Scroll to={`${id.id}`} smooth={true}>
              {id.heading}
            </Scroll>
            <br />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
