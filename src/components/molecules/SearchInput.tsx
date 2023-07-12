import { SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setIsPostsLoading: Dispatch<SetStateAction<boolean>>;
};

export const SearchInput: React.FC<Props> = ({
  value,
  setValue,
  setIsPostsLoading,
}) => {
  const router = useRouter();

  console.log(value);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
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
    <Box w="90%" mx="auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none" h="12">
          <Box pl="3" fontSize="2xl" color="gray.500">
            <AiOutlineSearch />
          </Box>
        </InputLeftElement>
        <Input
          onChange={handleChange}
          onKeyPress={handleSubmit}
          value={value}
          placeholder="キーワードを入力"
          borderRadius="3xl"
          size="lg"
        />
      </InputGroup>
    </Box>
  );
};
