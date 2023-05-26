import { Box, Text, Image, Link } from "@chakra-ui/react"
import { AiOutlineTwitter } from "react-icons/ai";

export default function About() {
  return (
    <Box 
      as='section'
      py="16"
      >
      <Text pb="5" color="gray.700" fontSize="3xl" fontWeight="bold">About</Text>
      <Image
        objectFit='cover'
        w="100%"
        h="30vh"
        src="images/image_01.jpg"
        alt="about"
      />
      <Box mt="3" display="flex" alignItems="center">
        <Text color="blue.400" fontSize="lg">
          <AiOutlineTwitter />
        </Text>
        <Link
          href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}`}
          target="_blank" 
          pl="1" 
          fontSize="sm"
          >@{process.env.NEXT_PUBLIC_TWITTER_ACCOUNT_NAME}
        </Link>
      </Box>
      <Text mt="3" fontSize="xm">
        こんにちは、ご訪問ありがとうございます。<br />
        都内でWebエンジニアをしています。<br />
        当ブログは開発で得たTipsのアウトプット兼、個人用のメモとなっています。
      </Text>
    </Box>
  )
}