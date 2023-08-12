import { Head } from "../../components/Head";
import { PostsLayout } from "../../components/templates/PostsLayout";
import { PostList } from "../../components/organisms/posts/PostList";
import { NextPage } from "next";

type Props = {};

const PostsPage: NextPage<Props> = () => {
  return (
    <>
      <Head title="Posts | sun develop" description="Webエンジニアの備忘録" />
      <PostsLayout>
        <PostList />
      </PostsLayout>
    </>
  );
};

export default PostsPage;
