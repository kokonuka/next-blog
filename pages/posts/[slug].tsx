import { GetServerSideProps } from "next"
import { Container, Image, Text, Box } from "@chakra-ui/react"

type Props = {
  post: object
}

const Post = (props: Props) => {
  const { post } = props

  return (
    <>
      <Container maxW="6xl" pb="10">
        {post.categories.nodes[0].name}
        <Text fontSize="4xl" fontWeight="bold" textAlign="center">{post.title}</Text>
        <Box display={{ base: "block", lg: "flex" }} width={{ base: "100%", lg: "4/6" }}>
          <Box bg="white" p="5" borderRadius="10">
            <Image
              objectFit='cover'
              borderRadius='2xl'
              src={post.featuredImage.node.mediaItemUrl}
              alt='Caffe Latte'
            />
            <Box py="10">
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </Box>
          </Box>
          <Box display={{ base: "none", lg: "block" }} width={{ base: "100%", lg: "2/6" }} pl="5">
            <Box bg="white" p="5" borderRadius="10">
              サイドバー
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Post


const queryFunc = (slug) => {
  return `query getPosts {
    post(id: "${slug}" idType: SLUG) {
      postId
      date
      title
      content
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }`
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query
  let query = queryFunc(slug)

  const response = await fetch(
    process.env.GRAPHQL_ENDPOINT,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  )
  const data = await response.json()
  
  const props: Props = {
    post: data.data.post
  }

  return { props }
}