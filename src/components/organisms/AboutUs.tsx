import { Box, Text, Link, Avatar, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export const AboutUs = () => {
  return (
    <Box
      as="section"
      mt="32"
      py="10"
      px="3"
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
      <Box mt="3">
        <Text textAlign="center">
          {process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}
        </Text>
        <Box mt="1" textAlign="center">
          <Box
            display="inline-grid"
            gridTemplateColumns="auto auto"
            justifyItems="start"
            gap="0.1em 0.5em"
          >
            <Box>
              <Link
                href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
                target="_blank"
                fontSize="2xl"
              >
                <AiOutlineTwitter />
              </Link>
            </Box>
            <Box>
              {" "}
              <Link
                href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
                target="_blank"
                fontSize="medium"
              >
                {process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}
              </Link>
            </Box>
            <Box>
              <Link
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}`}
                target="_blank"
                fontSize="2xl"
              >
                <FaGithub />
              </Link>
            </Box>
            <Box>
              <Link
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}`}
                target="_blank"
                fontSize="medium"
              >
                {process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}
              </Link>
            </Box>
          </Box>
        </Box>
        {/* <table style={{ tableLayout: "auto", margin: "0 auto" }}>
          <tr>
            <td colSpan={2}>{process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}</td>
          </tr>
          <tr>
            <td>
              <Link
                href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
                target="_blank"
                fontSize="2xl"
              >
                <AiOutlineTwitter />
              </Link>
            </td>
            <td>@{process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}</td>
          </tr>
          <tr>
            <td>
              <Link
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}`}
                target="_blank"
                fontSize="2xl"
              >
                <FaGithub />
              </Link>
            </td>
            <td>{process.env.NEXT_PUBLIC_GITHUB_ACCOUNT_NAME}</td>
          </tr>
        </table> */}
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
