import { Head } from "../../components/Head";
import { PostsLayout } from "../../components/templates/PostsLayout";
import { Posts } from "../../components/organisms/Posts";
import { NextPage } from "next";

type Props = {};

const PostsPage: NextPage<Props> = () => {
  return (
    <>
      <Head title="Posts | sun develop" description="Webエンジニアの備忘録" />
      <PostsLayout>
        <Posts />
      </PostsLayout>
    </>
  );
};

export default PostsPage;
