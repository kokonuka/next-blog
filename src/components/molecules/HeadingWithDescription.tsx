import { Box } from "@chakra-ui/react";
import { Heading } from "../atoms/Heading";

type Props = {
  text: string;
  description: string;
};

export const HeadingWithDescription: React.FC<Props> = ({
  text,
  description,
}) => {
  return (
    <>
      <Heading text={text} />
      <Box mt={3} whiteSpace="pre-wrap">
        {description}
      </Box>
    </>
  );
};
