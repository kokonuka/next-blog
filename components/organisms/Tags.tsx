import { Box, Tag as ChakraTag } from "@chakra-ui/react"
import { Tag } from "../../gql/generate/graphql"
import Link from "next/link"

type Props = {
  tags: Tag[]
}

export const Tags: React.FC<Props> = ({ tags }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap="2">
      {tags.map((tag) => (
        <Link href={`/tags/${tag.id}`} key={tag.id} >
          <ChakraTag>
            {tag.name}
          </ChakraTag>
        </Link>
      ))}
    </Box>
  )
}