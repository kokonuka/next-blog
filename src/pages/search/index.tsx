import { NextPage } from "next";
import { Head } from "../../components/Head";
import { SearchLayout } from "../../components/templates/SearchLayout";
import { SearchInput } from "../../components/organisms/search/SearchInput";
import { Tags } from "../../components/organisms/search/Tags";
import { Posts } from "@/components/organisms/search/Posts";
import { Container } from "@chakra-ui/react";

type Props = {};

const SearchPage: NextPage<Props> = () => {
  return (
    <>
      <Head title="Search | sun develop" description="Webエンジニアの備忘録" />
      <SearchLayout>
        <Container maxW="6xl">
          <SearchInput />
          <Tags />
        </Container>
        <Posts />
      </SearchLayout>
    </>
  );
};

export default SearchPage;
