import { Text } from "@chakra-ui/react";

type Props = {
  text: string;
};

export const TagHeading: React.FC<Props> = ({ text }) => {
  return (
    <Text fontSize="3xl" fontWeight="bold" textAlign="center">
      「{text}」
    </Text>
  );
};
