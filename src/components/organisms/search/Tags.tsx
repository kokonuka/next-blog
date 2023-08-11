import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FragmentType, graphql } from "@/gql/generated";
import client from "@/lib/graphqlClient";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectDisplayedTags,
  setDisplayedTags,
} from "@/redux/Slice/displayedTagsSlice";
import { selectAllTags, setAllTags } from "@/redux/Slice/allTagsSlice";
import { Box, Text } from "@chakra-ui/react";
import { TagButton, TagButtonFragment } from "../../atoms/TagButton";
import { Loader } from "../../molecules/Loader";

export const allTagsQueryDocument = graphql(`
  query allTagsQuery($endCursor: String!) {
    tags(first: 10, after: $endCursor) {
      nodes {
        ...TagButton
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

type Props = {};

export const Tags: React.FC<Props> = () => {
  const router = useRouter();
  const allTags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();
  const displayedTags = useAppSelector(selectDisplayedTags);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuery, setIsQuery] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const allTags = await fetchAllTags();
      dispatch(setAllTags(allTags));
      dispatch(setDisplayedTags(allTags));
      setIsLoading(false);
    };
    fetch();
  }, [dispatch]);

  // クエリの初期化
  useEffect(() => {
    const q = router.query.q;
    if (typeof q !== "string") {
      setIsQuery(false);
      return;
    }
    setIsQuery(true);
    setQuery(q);
  }, [router]);

  useEffect(() => {
    if (!isQuery) {
      dispatch(setDisplayedTags(allTags));
      return;
    }
    const filteredTags = allTags.filter((tag: any) =>
      tag.name?.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setDisplayedTags(filteredTags));
  }, [allTags, dispatch, isQuery, query]);

  const fetchAllTags = async () => {
    let tags: FragmentType<typeof TagButtonFragment>[] = [];
    let hasNextPage = true;
    let endCursor = "";
    while (hasNextPage) {
      const { data } = await client.query({
        query: allTagsQueryDocument,
        variables: {
          endCursor: endCursor,
        },
      });
      tags.push(...data.tags?.nodes!);
      endCursor = data.tags?.pageInfo?.endCursor!;
      if (!data.tags?.pageInfo?.hasNextPage) hasNextPage = false;
    }
    return tags;
  };

  return (
    <Box mt="10" pb="10">
      <Text fontWeight="bold" fontSize="2xl">
        Tags
      </Text>
      <Box mt="5" display="flex" flexWrap="wrap" gap={{ base: "1", md: "2" }}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {displayedTags.map((tag, i) => (
              <TagButton tag={tag} key={i} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};
