import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Head } from "../../components/Head";
import { useRouter } from "next/router";
import { getPostsOfSearch } from "../../graphql/queries/posts";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { Post } from "../../graphql/generate/graphql";
import { SearchLayout } from "../../components/templates/SearchLayout";
import { Tags } from "../../components/organisms/search/Tags";
import { SearchInput } from "../../components/organisms/search/SearchInput";

type Props = {};

const fetchPostsOfQuery = async (q: string | string[]) => {
  const data = await fetchGraphWithVariable(getPostsOfSearch, { keyword: q });
  return data.posts.nodes;
};

const SearchPage: NextPage<Props> = () => {
  const router = useRouter();
  const { q } = router.query;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  useEffect(() => {
    if (!q) {
      setPosts([]);
      setIsPostsLoading(false);
      return;
    }

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
        <SearchInput setIsPostsLoading={setIsPostsLoading} />
        <Tags />
        {/* <ResultPosts posts={posts} isPostsLoading={isPostsLoading} /> */}
      </SearchLayout>
    </>
  );
};

export default SearchPage;
