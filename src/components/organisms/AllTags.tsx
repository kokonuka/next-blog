import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Loader } from "../molecules/Loader";
import { Tag } from "../../graphql/generate/graphql";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { getNextTagsQuery, getTagsQuery } from "../../graphql/queries/tags";
import { TagButton } from "../atoms/TagButton";

type Props = {};

export const AllTags: React.FC<Props> = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      setTags(await fetchAllTags());
    })();
  }, [setTags]);

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
            {tags.map((tag, i) => (
              <TagButton tag={tag} key={i} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};
