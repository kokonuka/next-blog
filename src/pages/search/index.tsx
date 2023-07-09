import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Head } from "../../components/Head";
import { useRouter } from "next/router";
import { getPostsOfSearch } from "../../graphql/queries/posts";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { Post } from "../../graphql/generate/graphql";
import { Tag } from "../../graphql/generate/graphql";
import { SearchLayout } from "../../components/templates/SearchLayout";
import { ResultTags } from "../../components/organisms/ResultTags";
import { SearchInput } from "../../components/molecules/SearchInput";
import { ResultPosts } from "../../components/organisms/ResultPosts";

type Props = {};

export const tagFilter = (tags: Tag[], q: string) => {
  return tags.filter((tag) => {
    return tag?.name
      ?.toLowerCase()
      .includes(typeof q == "string" ? q.toLowerCase() : "")
      ? true
      : false;
  });
};

const fetchPostsOfQuery = async (q: string | string[]) => {
  const data = await fetchGraphWithVariable(getPostsOfSearch, { keyword: q });
  return data.posts.nodes;
};

const SearchPage: NextPage<Props> = () => {
  const router = useRouter();
  const { q } = router.query;
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [isInitializedTags, setIsInitializedTags] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  useEffect(() => {
    if (!isInitializedTags) return;

    if (!q) {
      setPosts([]);
      setIsPostsLoading(false);
      setActiveTags(tags);
      return;
    }

    setValue(q as string);
    setActiveTags(tagFilter(tags, q as string));
    (async () => {
      const post = await fetchPostsOfQuery(q);
      setPosts(post);
      setIsPostsLoading(false);
    })();
  }, [q, isInitializedTags, isPostsLoading]);

  useEffect(() => {
    setIsPostsLoading(true);
  }, [q]);

  return (
    <>
      <Head title="Search | sun develop" description="Webエンジニアの備忘録" />
      <SearchLayout>
        <SearchInput
          tags={tags}
          value={value}
          setValue={setValue}
          setActiveTags={setActiveTags}
          setIsPostsLoading={setIsPostsLoading}
        />
        <ResultTags
          activeTags={activeTags}
          setTags={setTags}
          setIsInitializedTags={setIsInitializedTags}
        />
        {/* <ResultPosts posts={posts} isPostsLoading={isPostsLoading} /> */}
      </SearchLayout>
    </>
  );
};

export default SearchPage;
