import { Box, Text, Link, Avatar, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export const Profile = () => {
  return (
    <Box
      as="section"
      py="10"
      px="5"
      bg={useColorModeValue("white", "gray.800")}
      border={useColorModeValue("0", "1px")}
      borderRight={{ base: "none", lg: useColorModeValue("0", "1px") }}
      borderLeft={{ base: "none", lg: useColorModeValue("0", "1px") }}
      borderRadius={{ base: "", lg: useColorModeValue("0", "base") }}
      borderColor={{
        base: useColorModeValue("gray.200", "gray.700"),
        lg: useColorModeValue("gray.200", "gray.700"),
      }}
      position="sticky"
      top="3.5rem"
    >
      <Box display="flex" justifyContent="center">
        <Avatar
          size="2xl"
          name="sun"
          src="images/image_01.jpg"
          objectFit="contain"
        />
      </Box>
      <Box
        mt="5"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex="1"
      >
        <Box
          mt="3"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="2"
        >
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            sun
          </Text>
          {/* <Link
            href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
            target="_blank"
            fontSize="2xl"
            color="blue.400"
          >
            <AiOutlineTwitter />
          </Link> */}
          <Link
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}`}
            target="_blank"
            fontSize="2xl"
          >
            <FaGithub />
          </Link>
        </Box>
      </Box>
      <Box>
        <Text mt="7" fontSize="sm" textAlign="center" lineHeight="1.8">
          ご訪問ありがとうございます。
          <br />
          都内でWebエンジニアをしています。
          <br />
          当ブログでは開発で得たTipsのアウトプットをしています。
        </Text>
      </Box>
    </Box>
  );
};
