import React from "react";
import { useQuery } from "@apollo/client";
import HeadCard from "@/components/organisms/home/HeadCard";
import { getFirstPostQueryDocuments } from "@/gql/query/posts/getFirstPost";
import { PostFragment } from "@/gql/generated/graphql";

const TopPost = () => {
  const { data, loading, error } = useQuery(getFirstPostQueryDocuments);

  if (error) return <p>読み込みエラー</p>;

  if (loading) return <p>ローディング</p>;

  return <HeadCard post={data?.posts?.nodes[0] as PostFragment} />;
};

export default TopPost;
