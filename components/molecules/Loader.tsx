import { Box } from "@chakra-ui/react"

export const Loader = () => {
  return (
    <Box mt="10" w="100%" display="flex" justifyContent="center" >
      <div className="loader" ></div>
    </Box>
  )
}