import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PostsLayout } from "../../components/templates/PostsLayout";
import { CategoryPosts } from "../../components/organisms/category/CategoryPosts";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { set } from "../../redux/Slice/categoryIdSlice";

const CategoryPage: NextPage = () => {
  const router = useRouter();
  const id = useAppSelector((state) => state.categoryId.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = router.query.id;
    if (id) dispatch(set(id));
  }, [dispatch, router]);

  return <PostsLayout>{id != "" && <CategoryPosts />}</PostsLayout>;
};

export default CategoryPage;
