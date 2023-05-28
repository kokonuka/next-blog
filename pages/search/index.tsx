import { useState, useEffect } from "react"
import { NextPage } from "next";
import { Head } from "../../components/Head";
import { useRouter } from 'next/router'
import { getTagsQuery, getNextTagsQuery } from "../../graphql/queries/tags";
import { getPostsOfSearch } from "../../graphql/queries/posts";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { Post } from "../../gql/generate/graphql";
import { Tag } from "../../graphql/types/tags";
import { ColPosts } from "../../components/molecules/ColPosts";
import { 
  Box, 
  InputGroup, 
  InputLeftElement, 
  Input, 
  Tag as ChakraTag,
  Text
} from '@chakra-ui/react'
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { SearchLayout } from "../../components/templates/SearchLayout";
import { Loader } from "../../components/molecules/Loader";

type Props = {}


const fetchPostsOfQuery = async (q: string | string[]) => {
  const data = await fetchGraphWithVariable(getPostsOfSearch, { keyword: q })
  return data.posts.nodes;
};

const SearchPage: NextPage<Props> = () => {
  const [viewTags, setViewTags] = useState<Tag[]>([]);
  const router = useRouter();
  const { q } = router.query
  const [value, setValue] = useState("")
  const [posts, setPosts] = useState<Post[]>([])

  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  const fetchTags = async () => {
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
    }
    setIsLoadingTags(false);

    return tags;
  }

  useEffect(() => {
    ( async() => {
      setTags(await fetchTags())
    } )();
  }, [])

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
      <Head title='Search | kimagurecode' description='Webエンジニアの備忘録' />
      <SearchLayout>
        <Box w={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" }} mx="auto" >
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
        </Box>

        <Box mt="10">
          <Text fontWeight="bold">Tags</Text>
          <Box mt="5" display="flex" flexWrap="wrap" gap="3">
            {isLoadingTags ? <Loader /> : (
              <>
                {viewTags.map((tag: Tag) => (
                  <Link href={`/tags/${tag.id}`} key={tag.id} >
                    <ChakraTag px={4} py={3} >{tag.name}</ChakraTag>
                  </Link>
                ))}
              </>
            )}
          </Box>
        </Box>
        <Box mt="10">
          <Text fontWeight="bold">Posts</Text>
          <Box mt="5">
            <ColPosts posts={posts}/>
          </Box>
        </Box>
      </SearchLayout>
    </>
  )
};

export default SearchPage;
