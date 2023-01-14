import { Box, Text, Image } from "@chakra-ui/react"
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
      />
      <Box mt="3" display="flex" alignItems="center">
        <Text color="blue.400" fontSize="lg">
          <AiOutlineTwitter />
        </Text>
        <Text pl="1" fontSize="sm">
          <a href="https://twitter.com/sunrise_web_dev" target="_blank">@sunrise_web_dev</a>
        </Text>
      </Box>
      <Text mt="3" fontSize="xs">
        駆け出しエンジニアです<br />
        2022年よりWeb業界に勤めています<br />
        <br />
        当ブログはNext.js、TypeScript、Redux、Chakra UI、GraphQL、Vercel、ヘッドレスCMSを用いて構築した、JAMstackな完全自作自己満ブログです。<br />
        主に自分のための備忘録兼、学習のアウトプット用として使っています。
      </Text>
    </Box>
  )
}