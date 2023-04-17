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
          href="https://twitter.com/web_dev_penguin" 
          target="_blank" 
          pl="1" 
          fontSize="sm"
          >@web_dev_penguin
        </Link>
      </Box>
      <Text mt="3" fontSize="xm">
        Webエンジニアです<br />
        2022年よりWeb業界に勤めています<br />
        <br />
        当ブログはNext.js、TypeScript、Chakra UI、GraphQL、Redux、Vercel、ヘッドレスCMSを用いて構築しており、<br />
        JAMstack構成でSSG配信しています。<br />

        主に学習のアウトプット兼メモとして使っています。
      </Text>
    </Box>
  )
}