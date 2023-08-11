import React from "react";
import { useQuery } from "@apollo/client";
import { getFirstPostQueryDocuments } from "@/gql/query/posts/getFirstPost";
import HeadCard from "@/components/organisms/home/HeadCard";

const TopPost = () => {
  const { data, loading, error } = useQuery(getFirstPostQueryDocuments);

  if (error) return <p>読み込みエラー</p>;

  return <HeadCard post={data?.posts?.nodes[0]} loading={loading} />;
};

export default TopPost;
