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
