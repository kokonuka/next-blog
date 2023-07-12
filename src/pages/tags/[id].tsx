import { NextPage } from "next";
import { PostsLayout } from "../../components/templates/PostsLayout";
import { TagPosts } from "../../components/organisms/tag/TagPosts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tag: NextPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      setId(id as string);
    }
  }, [router]);

  return <PostsLayout>{id != "" && <TagPosts id={id} />}</PostsLayout>;
};

export default Tag;
