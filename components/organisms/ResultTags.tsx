import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box, Tag as ChakraTag, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Loader } from '../molecules/Loader'
import { Tag } from '../../gql/generate/graphql'
import { fetchGraphWithVariable } from '../../graphql/fetchGraphql'
import { getNextTagsQuery, getTagsQuery } from '../../graphql/queries/tags'

type Props = {
  activeTags: Tag[]
  setTags: Dispatch<SetStateAction<Tag[]>>
  setIsInitializedTags: Dispatch<SetStateAction<boolean>>
}

const fetchTags = async (setIsTagsLoading: Dispatch<SetStateAction<boolean>>) => {
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
  setIsTagsLoading(false);
  return tags;
}

export const ResultTags: React.FC<Props> = ({ activeTags, setTags, setIsInitializedTags }) => {
  const [isTagsLoading, setIsTagsLoading] = useState(true);

  useEffect(() => {
    ( async() => {
      const tags = await fetchTags(setIsTagsLoading);
      setTags(tags);
      setIsInitializedTags(true);
    } )();
  }, [])

  return (
    <Box mt="10">
      <Text fontWeight="bold">Tags</Text>
      <Box mt="5" display="flex" flexWrap="wrap" gap="3">
        {isTagsLoading ? <Loader /> : (
          <>
            {activeTags.map((tag) => (
              <Link href={`/tags/${tag.id}`} key={tag.id} >
                <ChakraTag px={4} py={3} >{tag.name}</ChakraTag>
              </Link>
            ))}
          </>
        )}
      </Box>
    </Box>
  )
}