import { Container, Box, Text, Link } from "@chakra-ui/react"
import { AiOutlineTwitter } from "react-icons/ai";

export const Footer = () => {
  return (
    <Box as="footer">
      <Container maxW="6xl" p="5">
        <Box display="flex" justifyContent="center">
          <Link href="https://twitter.com/sunrise_web_dev" target="_blank" fontSize="2xl">
            <AiOutlineTwitter/>
          </Link>
        </Box>
        <Text mt="3" fontSize="xs" textAlign="center">
          © Copyright 2023 kimagurecode. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}