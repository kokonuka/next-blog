import { Box, Text } from "@chakra-ui/react";
import { formatDate } from "@/lib/formatDate";

type Props = {
  title: string;
  date: string;
};

export const Header: React.FC<Props> = ({ title, date }) => {
  return (
    <Box mt="10" px="3">
      <Text
        fontSize={{ base: "2xl", lg: "4xl" }}
        fontWeight="bold"
        color="gray.700"
        textAlign="center"
      >
        {title}
      </Text>
      <Text mt="5" color="gray.500" textAlign="center">
        {formatDate(date)}
      </Text>
    </Box>
  );
};
