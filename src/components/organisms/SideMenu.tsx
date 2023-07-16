import { Link as Scroll } from "react-scroll";
import { Headings } from "../../pages/posts/[id]";
import { Box } from "@chakra-ui/react";

type Props = {
  headings: Headings[];
};

export const SideMenu: React.FC<Props> = ({ headings }) => {
  return (
    <Box
      display={{ base: "none", lg: "block" }}
      width={{ base: "100%", lg: "30%" }}
      pl="5"
    >
      <Box bg="white" p="5" borderRadius="10">
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
