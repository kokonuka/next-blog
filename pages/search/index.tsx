import { useState, useEffect } from "react"
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router'
import { getTagsQuery, getNextTagsQuery } from "../../graphql/queries/tags";
import { getPostsOfSearch } from "../../graphql/queries/posts";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { ViewPost } from "../../graphql/types/posts";
import { Tag } from "../../graphql/types/tags";
import CardList from "../../components/molecules/LawPosts";
import { sliceText } from "../../lib/sliceText";
import { getDateDiff } from "../../lib/getDateDiff";
import { 
  VStack, 
  Container, 
  Box, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Tag as ChakraTag,
  Text
} from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

type Props = {
  tags: Tag[]
}

const fetchPostsOfQuery = async (q: string | string[]) => {
  const data = await fetchGraphWithVariable(getPostsOfSearch, { keyword: q })
  return data.posts.nodes.map((post: ViewPost) => {
    post.clippedTitle = sliceText(post.title);
    post.dateDiff = getDateDiff(post.date);
    return post;
  });
};

const Index: NextPage<Props> = ({ tags }) => {
  const [viewTags, setViewTags] = useState<Tag[]>(tags);
  const router = useRouter();
  const { q } = router.query
  const [value, setValue] = useState("")
  const [posts, setPosts] = useState<ViewPost[]>([])

  const handleChange = (e: any) => {
    const value = e.target.value;
    setValue(e.target.value);

    const filterdTags = tags.filter(tag => {
      return tag.name.toLowerCase().includes(value.toLowerCase()) ? true : false;
    });
    setViewTags(filterdTags);
  };

  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      router.push({
        pathname: "search",
        query: { q: value }
      });
    }
  };

  useEffect(() => {
    if(!q) {
      setPosts([]);
      setViewTags(tags);
      return;
    };
    ( async() => {
      setPosts(await fetchPostsOfQuery(q));
      const filterdTags = tags.filter(tag => {
        return tag.name.toLowerCase().includes(typeof q == "string" ? q.toLowerCase() : "") ? true : false;
      });
      setViewTags(filterdTags);
      setValue(typeof q == "string" ? q : "");
    } )();
  }, [q, tags]);

  return (
    <>
      <Head>
        <title>Search | kimagurecode</title>
        <meta name="description" content="駆け出しエンジニアの備忘録" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="white" flex="1">
        <Container maxW="6xl">
          <VStack mt="10">
            <VStack w={{ 
              base: "90%", 
              sm: "80%", 
              md: "70%",
              lg: "60%",
              xl: "50%",
            }}>
              <InputGroup >
                <InputLeftElement pointerEvents='none'>
                  <AiOutlineSearch/>
                </InputLeftElement>
                <Input
                  onChange={handleChange}
                  onKeyPress={handleSubmit}
                  value={value}
                  placeholder='Enter Keyword' 
                  borderRadius="20" 
                />
              </InputGroup>
            </VStack>
          </VStack>
            <Box mt="10">
              <Text fontWeight="bold">Tags</Text>
              <Box mt="5" display="flex" flexWrap="wrap" gap="3">
                {viewTags.map((tag: Tag) => (
                  <Link href={`/tags/${tag.id}`} key={tag.id} >
                    <ChakraTag px={4} py={3} >{tag.name}</ChakraTag>
                  </Link>
                ))}
              </Box>
            </Box>
            <Box mt="10">
              <Text fontWeight="bold">Posts</Text>
              <Box mt="5">
                <CardList posts={posts}/>
              </Box>
            </Box>
        </Container>
      </Box>
    </>
  )
};

export default Index;


export const getStaticProps: GetStaticProps<Props> = async () => {
  let tags: Tag[] = [];

  let hasNextPage = true;
  let endCursor = "";
  while (hasNextPage) {
    const data = tags.length == 0 
      ? await fetchGraphWithVariable(getTagsQuery, { "count": 10 }) 
      : await fetchGraphWithVariable(getNextTagsQuery, { "endCursor": endCursor });

    tags.push(...data.tags.nodes);
    endCursor = data.tags.pageInfo.endCursor;

    if(!data.tags.pageInfo.hasNextPage) hasNextPage = false;
  };

  return {
    props:{
      tags
    }
  }
};
