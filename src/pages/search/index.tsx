import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Head } from "../../components/Head";
import { useRouter } from "next/router";
import { getPostsOfSearch } from "../../graphql/queries/posts";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { Post } from "../../graphql/generate/graphql";
import { SearchLayout } from "../../components/templates/SearchLayout";
import { AllTags } from "../../components/organisms/AllTags";
import { SearchInput } from "../../components/molecules/SearchInput";

type Props = {};

const fetchPostsOfQuery = async (q: string | string[]) => {
  const data = await fetchGraphWithVariable(getPostsOfSearch, { keyword: q });
  return data.posts.nodes;
};

const SearchPage: NextPage<Props> = () => {
  const router = useRouter();
  const { q } = router.query;
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  useEffect(() => {
    if (!q) {
      setPosts([]);
      setIsPostsLoading(false);
      return;
    }

    setValue(q as string);
    (async () => {
      const post = await fetchPostsOfQuery(q);
      setPosts(post);
      setIsPostsLoading(false);
    })();
  }, [q, isPostsLoading]);

  useEffect(() => {
    setIsPostsLoading(true);
  }, [q]);

  return (
    <>
      <Head title="Search | sun develop" description="Webエンジニアの備忘録" />
      <SearchLayout>
        <SearchInput
          value={value}
          setValue={setValue}
          setIsPostsLoading={setIsPostsLoading}
        />
        <AllTags />
        {/* <ResultPosts posts={posts} isPostsLoading={isPostsLoading} /> */}
      </SearchLayout>
    </>
  );
};

export default SearchPage;
