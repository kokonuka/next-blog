import { Box, Text, Image, Link, Heading } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";

export const AboutUs = () => {
  return (
    <Box as="section" mt="20">
      <Heading color="gray.700" fontSize="5xl" fontWeight="bold">
        About
      </Heading>
      <Box mt="5" bg="white" p="5" display={{ base: "block", lg: "flex" }}>
        <Box>
          <Image
            objectFit="cover"
            w="100%"
            h="30vh"
            src="images/image_01.jpg"
            alt="about"
          />
        </Box>
        <Box pl={{ base: "0", lg: "5" }}>
          <Box mt="5" display="flex" alignItems="center">
            <Text color="blue.400" fontSize="lg">
              <AiOutlineTwitter />
            </Text>
            <Link
              href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
              target="_blank"
              pl="1"
              fontSize="sm"
            >
              @{process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}
            </Link>
          </Box>
          <Text mt="5" pb="10" fontSize="xm">
            こんにちは、ご訪問ありがとうございます。
            <br />
            都内でWebエンジニアをしています。
            <br />
            当ブログは開発で得たTipsのアウトプット兼、個人用のメモとなっています。
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
