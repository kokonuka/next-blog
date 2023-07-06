import { NextPage } from "next";
import {
  getTagsQuery,
  getNextTagsQuery,
  getPostTag,
} from "../../graphql/queries/tags";
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

  return (
    <PostsLayout>
      {/* <Text
        color="gray.700"
        fontSize="3xl"
        fontWeight="bold"
        textAlign="center"
      >
        {tag.name}
      </Text>
      <Box mt="10">
        <LawPosts posts={posts} />
      </Box> */}
      {id != "" && <TagPosts id={id} />}
    </PostsLayout>
  );
};

export default Tag;

// export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
//   const id = params!.id;
//   const data = await fetchGraphWithVariable(getPostTag, { id });

//   const posts = data.tag.contentNodes.nodes.map((post: ViewPost) => {
//     post.clippedTitle = sliceText(post.title);
//     post.dateDiff = getFormattedDateTimeDiff(post.date);
//     return post;
//   });

//   return {
//     props: {
//       tag: data.tag,
//       posts: data.tag.contentNodes.nodes,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   let tags: TypeTag[] = [];

//   let hasNextPage = true;
//   let endCursor = "";
//   while (hasNextPage) {
//     const data =
//       tags.length == 0
//         ? await fetchGraphWithVariable(getTagsQuery, { count: 10 })
//         : await fetchGraphWithVariable(getNextTagsQuery, {
//             endCursor: endCursor,
//           });

//     tags.push(...data.tags.nodes);
//     endCursor = data.tags.pageInfo.endCursor;

//     if (!data.tags.pageInfo.hasNextPage) hasNextPage = false;
//   }

//   const paths = tags.map((tag: TypeTag) => {
//     return {
//       params: {
//         id: `${tag.id}`,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };
