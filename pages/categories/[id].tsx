import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CategoryContext } from "../_app";
import { PostsLayout } from "../../components/templates/PostsLayout";
import { CategoryPosts } from "../../components/organisms/category/CategoryPosts";

const CategoryPage: NextPage = () => {
  const { setCarrentCategoryId } = useContext(CategoryContext);
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      setId(id as string);
      setCarrentCategoryId(id as string);
    }
  }, [router, setCarrentCategoryId]);

  return <PostsLayout>{id != "" && <CategoryPosts id={id} />}</PostsLayout>;
};

export default CategoryPage;
