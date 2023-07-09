import { SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { Tag } from "../../graphql/generate/graphql";
import { tagFilter } from "../../pages/search";

type Props = {
  tags: Tag[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setActiveTags: Dispatch<SetStateAction<Tag[]>>;
  setIsPostsLoading: Dispatch<SetStateAction<boolean>>;
};

export const SearchInput: React.FC<Props> = ({
  tags,
  value,
  setValue,
  setActiveTags,
  setIsPostsLoading,
}) => {
  const router = useRouter();

  console.log(value);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    setActiveTags(tagFilter(tags, value));
  };

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "search",
        query: { q: value },
      });
      // setIsPostsLoading(true);
    }
  };

  return (
    <Box
      w={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" }}
      mx="auto"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch />
        </InputLeftElement>
        <Input
          onChange={handleChange}
          onKeyPress={handleSubmit}
          value={value}
          placeholder="Enter Keyword"
          borderRadius="20"
        />
      </InputGroup>
    </Box>
  );
};
