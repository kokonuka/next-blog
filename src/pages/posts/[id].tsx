import { Head } from "../../components/Head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/base16/nova.css";
import { fetchGraphWithVariable } from "../../graphql/fetchGraphql";
import { getPostsQuery, getNextPostsQuery } from "../../graphql/queries/posts";
import { GetPostDocument } from "../../graphql/generate/graphql";
import { PostLayout } from "../../components/templates/PostLayout";
import "zenn-content-css";
// import { Post } from "../../graphql/types/posts";
import { Post, Tag } from "../../graphql/generate/graphql";
import client from "../../lib/graphqlClient";

export type IdsWithHeadings = {
  id: string;
  heading: string;
};

export type Props = {
  post: Post;
  content: string;
  idsWithHeadings: IdsWithHeadings[];
};

const PostPage: NextPage<Props> = ({ post, content, idsWithHeadings }) => {
  return (
    <>
      <Head
        title={`${post.title} | sun develop`}
        description="Webエンジニアの備忘録"
      />
      <PostLayout
        post={post}
        content={content}
        idsWithHeadings={idsWithHeadings}
      />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  const { data } = await client.query({
    query: GetPostDocument,
    variables: {
      id,
    },
  });
  const post = data?.post as Post;

  const $ = load(post.content!);

  // codeタグにhighlight.jsを適用
  const codes = $("pre code");
  codes.each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  // 見出しにIDを追加
  const headings = $("h1, h2, h3, h4, h5, h6");
  let idsWithHeadings: IdsWithHeadings[] = [];
  headings.each((index, elm) => {
    const heading = $(elm).text();
    const id = `${elm.tagName}-${index}`;
    $(elm).attr("id", id);

    idsWithHeadings.push({
      id,
      heading,
    });
  });

  return {
    props: {
      post,
      content: $.html(),
      idsWithHeadings,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let posts: Post[] = [];

  let hasNextPage = true;
  let endCursor = "";
  while (hasNextPage) {
    const data =
      posts.length == 0
        ? await fetchGraphWithVariable(getPostsQuery, { count: 10 })
        : await fetchGraphWithVariable(getNextPostsQuery, {
            endCursor: endCursor,
          });

    posts.push(...data.posts.nodes);
    endCursor = data.posts.pageInfo.endCursor;

    if (!data.posts.pageInfo.hasNextPage) hasNextPage = false;
  }

  const paths = posts.map((post: Post) => {
    return {
      params: {
        id: `${post.databaseId}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
