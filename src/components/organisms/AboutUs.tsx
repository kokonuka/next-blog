import { Box, Text, Link, Avatar, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export const AboutUs = () => {
  return (
    <Box
      as="section"
      mt="32"
      py="10"
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          size="2xl"
          name="Dan Abrahmov"
          src="images/image_01.jpg"
          objectFit="contain"
        />
      </Box>
      <Box mt="7" display="flex" justifyContent="center" gap="3">
        <Link
          href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
          target="_blank"
          pl="1"
          fontSize="sm"
        >
          @{process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}
        </Link>
        <Link
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}`}
          target="_blank"
          fontSize="2xl"
        >
          <FaGithub />
        </Link>
        <Link
          href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
          target="_blank"
          fontSize="2xl"
        >
          <AiOutlineTwitter />
        </Link>
      </Box>
      <Box>
        <Text mt="7" fontSize="xm" textAlign="center">
          こんにちは、ご訪問ありがとうございます。
          <br />
          都内でWebエンジニアをしています。
          <br />
          当ブログは開発で得たTipsのアウトプット兼、個人用のメモとなっています。
        </Text>
      </Box>
    </Box>
  );
};
