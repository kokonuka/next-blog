import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import client from "../../lib/graphqlClient";
import { FragmentType, graphql, useFragment } from "@/gql/generated";
import { PostPageFragment as PostPageFragmentType } from "@/gql/generated/graphql";
import { PostPageFragment } from "@/gql/fragments/postPage";
import { CheerioAPI, load } from "cheerio";
import { Box } from "@chakra-ui/react";
import { PostLayout } from "@/components/templates/PostLayout";
import { Head } from "../../components/Head";
import { Content } from "@/components/organisms/post/Content";
import { SideMenu } from "@/components/organisms/post/SideMenu";

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

export type Props = {
  post: FragmentType<typeof PostPageFragment>;
  content: string;
};

const PostPage: NextPage<Props> = ({ post: propsPost, content }) => {
  const post = useFragment(PostPageFragment, propsPost);

  return (
    <>
      <Head
        title={`${post.title} | sun develop`}
        description="Webエンジニアの備忘録"
      />
      <PostLayout>
        <Box
          as="main"
          width={{ base: "100%", lg: "calc(100% - 320px)" }}
          pr={{ base: "0", lg: "40px", xl: "80px" }}
        >
          <Content post={post} content={content} />
        </Box>
        <Box
          as="aside"
          mt={{ base: "14", lg: "0" }}
          w={{ base: "100%", lg: "320px" }}
        >
          <SideMenu content={content} />
        </Box>
      </PostLayout>
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

  const content = post.content;
  const $ = load(typeof content === "string" ? content : "");
  const $highlighted = highlightCode($);
  setHeadingId($);

  return {
    props: {
      post: data.post as FragmentType<typeof PostPageFragment>,
      content: $highlighted.html(),
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

const highlightCode = ($: CheerioAPI) => {
  const cheerioCodes = $('pre code[class*="language-"]');

  cheerioCodes.each((_, code) => {
    const cheerioCode = $(code);
    const className = cheerioCode.attr("class") as string;

    const regex = /^language-(\w+):(\S+)$/;
    // const regex = /language-(\w+)(?::(\S+))?/;
    const match = className.match(regex);

    if (!match) return;

    const language = match[1];
    const fileName = match[2];
    // const fileName = match[2] || "";

    const codeBlock = `
      <div class="code-block-container">
        <div class="code-block-filename-container">
          <span class="code-block-filename">${fileName}</span>
        </div>
        <pre>
          <code class="language-${language}">${cheerioCode.text()}</code>
        </pre>
      </div>
    `;

    const pre = cheerioCode.parent()[0];
    $(pre).replaceWith(codeBlock);
  });

  return $;
};

const setHeadingId = ($: CheerioAPI) => {
  const cheerioHeadings = $("h1, h2, h3, h4, h5, h6");
  cheerioHeadings.each((index, elm) => {
    const id = `${elm.tagName}-${index}`;
    $(elm).attr("id", id);
  });
};
