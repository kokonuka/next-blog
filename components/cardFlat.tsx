import NextLink from "next/link";
import { FragmentType, graphql, useFragment } from "../gql";
import { Box, Heading, Text, Image, Link } from "@chakra-ui/react";
import { getFormattedDateTimeDiff } from "../lib/getFormattedDateTimeDiff";

type Props = {
  post: FragmentType<typeof PostFragment>;
};

export const PostFragment = graphql(`
  fragment PostItem on Post {
    id
    title
    date
    featuredImage {
      node {
        mediaItemUrl
      }
    }
    categories {
      nodes {
        id
        name
      }
    }
    tags {
      nodes {
        id
        name
      }
    }
  }
`);

export const CardFlat: React.FC<Props> = (props) => {
  const post = useFragment(PostFragment, props.post);
  const category = post?.categories?.nodes[0];
  const defaultPostImage = "../images/default_post_image.jpg";

  return (
    <>
      <Box as="article">
        <Box w="100%" display="flex">
          <Link as={NextLink} href={`/posts/${post.id}`}>
            <Image
              objectFit="cover"
              bg="white"
              width="75px"
              height="75px"
              borderRadius="2xl"
              src={post.featuredImage?.node?.mediaItemUrl || defaultPostImage}
              alt="article"
            />
          </Link>
          <Box p="0" pl="3" flex="1">
            <Link as={NextLink} href={`/posts/${post.id}`} _hover={{}}>
              <Heading size="md" color="gray.700">
                {post.title}
              </Heading>
            </Link>
            <Box mt="3" fontSize="xs" display="flex" gap="2">
              <Link as={NextLink} href={`/categories/${category?.id}`}>
                {category?.name}
              </Link>
              <Text fontSize="xs">{getFormattedDateTimeDiff(post.date!)}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
