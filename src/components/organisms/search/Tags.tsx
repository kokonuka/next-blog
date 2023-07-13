import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectDisplayedTags,
  setDisplayedTags,
} from "@/redux/Slice/displayedTagsSlice";
import { setAllTags } from "@/redux/Slice/allTagsSlice";
import { Tag } from "../../../graphql/generate/graphql";
import { fetchGraphWithVariable } from "../../../graphql/fetchGraphql";
import { getNextTagsQuery, getTagsQuery } from "../../../graphql/queries/tags";
import { Box, Text } from "@chakra-ui/react";
import { Loader } from "../../molecules/Loader";
import { TagButton } from "../../atoms/TagButton";

type Props = {};

export const Tags: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const displayedTags = useAppSelector(selectDisplayedTags);

  useEffect(() => {
    (async () => {
      dispatch(setAllTags(await fetchAllTags()));
      dispatch(setDisplayedTags(await fetchAllTags()));
    })();
  }, [dispatch]);

  const fetchAllTags = async () => {
    let tags: Tag[] = [];
    let hasNextPage = true;
    let endCursor = "";
    while (hasNextPage) {
      const data =
        tags.length == 0
          ? await fetchGraphWithVariable(getTagsQuery, { count: 10 })
          : await fetchGraphWithVariable(getNextTagsQuery, {
              endCursor: endCursor,
            });
      tags.push(...data.tags.nodes);
      endCursor = data.tags.pageInfo.endCursor;
      if (!data.tags.pageInfo.hasNextPage) hasNextPage = false;
    }
    setIsLoading(false);
    return tags;
  };

  return (
    <Box mt="10">
      <Text fontWeight="bold" fontSize="2xl">
        Tags
      </Text>
      <Box mt="5" display="flex" flexWrap="wrap" gap="3">
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
