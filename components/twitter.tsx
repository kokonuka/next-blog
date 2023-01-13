import { Box, Text } from "@chakra-ui/react"

export default function Twitter() {
  return (
    <Box py="16" as='section'>
      <Text pb="5" fontSize="3xl" fontWeight="bold">Twitter</Text>
      <a className="twitter-timeline" data-lang="ja" data-height="800" data-theme="light" href="https://twitter.com/sunrise_web_dev?ref_src=twsrc%5Etfw">Tweets by sunrise_web_dev</a> 
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </Box>
  )
}