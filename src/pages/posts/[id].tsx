import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import "highlight.js/styles/base16/nova.css";
import "zenn-content-css";
import client from "../../lib/graphqlClient";
import { FragmentType, graphql, useFragment } from "@/gql";
import { PostPageFragment as PostPageFragmentType } from "@/gql/graphql";
import { PostPageFragment } from "@/components/organisms/post/Post";
import { CheerioAPI, load } from "cheerio";
import hljs from "highlight.js";
import { Head } from "../../components/Head";
import { PostLayout } from "@/components/templates/PostLayout";

export const allPostsQueryDocument = graphql(`
  query allPostsQuery($endCursor: String!) {
    posts(first: 10, after: $endCursor) {
      nodes {
        databaseId
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`);

export const postQueryDocument = graphql(`
  query postQuery($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      ...PostPage
    }
  }
`);

export type Headings = {
  id: string;
  heading: string;
};

export type Props = {
  post: FragmentType<typeof PostPageFragment>;
  content: string;
  headings: Headings[];
};

const PostPage: NextPage<Props> = ({ post: propsPost, content, headings }) => {
  const post = useFragment(PostPageFragment, propsPost);

  return (
    <>
      <Head
        title={`${post.title} | sun develop`}
        description="Webエンジニアの備忘録"
      />
      <PostLayout post={post} content={content} headings={headings} />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  const { data } = await client.query({
    query: postQueryDocument,
    variables: {
      id,
    },
  });

  const post = data.post as PostPageFragmentType;
  const { $, headings } = excuteFormatHtml(post.content);

  return {
    props: {
      post: data.post as FragmentType<typeof PostPageFragment>,
      content: $.html(),
      headings: headings,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchAllPosts();
  const paths = posts.map((post) => {
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

const fetchAllPosts = async () => {
  let posts: {
    __typename?: "Post" | undefined;
    databaseId: number;
  }[] = [];

  let hasNextPage = true;
  let endCursor = "";
  while (hasNextPage) {
    const { data } = await client.query({
      query: allPostsQueryDocument,
      variables: {
        endCursor: endCursor,
      },
    });
    posts.push(...data.posts?.nodes!);
    endCursor = data.posts?.pageInfo?.endCursor!;
    if (!data.posts?.pageInfo?.hasNextPage) hasNextPage = false;
  }
  return posts;
};

const excuteFormatHtml = (content: string | null | undefined) => {
  const $ = load(typeof content === "string" ? content : "");

  const codes = $("pre code");
  codes.each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  let headings: Headings[] = [];
  const cheerioHeadings = $("h1, h2, h3, h4, h5, h6");
  cheerioHeadings.each((index, elm) => {
    const id = `${elm.tagName}-${index}`;
    $(elm).attr("id", id);
    const heading = $(elm).text();
    headings.push({
      id,
      heading,
    });
  });
  return { $, headings };
};
