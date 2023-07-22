import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setDisplayedTags } from "@/redux/Slice/displayedTagsSlice";
import { selectAllTags } from "@/redux/Slice/allTagsSlice";
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Kbd,
} from "@chakra-ui/react";

type Props = {};

export const SearchInput: React.FC<Props> = () => {
  const router = useRouter();
  const allTags = useAppSelector(selectAllTags);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const q = router.query.q;
    if (typeof q === "string") setValue(q);
  }, [router]);

  useEffect(() => {
    if (value) {
      setIsDisabled(false);
      return;
    }
    if (!value && router.query.q) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [value, router.query.q]);

  const handleToggleFocus = () => {
    // isFocusによって押せなくなるため
    setTimeout(() => setIsFocus(!isFocus), 100);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    if (typeof router.query.q === "string") return;
    const filteredTags = allTags.filter((tag: any) => {
      // valueが空要素の場合trueとなる
      return tag.name?.toLowerCase().includes(value.toLowerCase());
    });
    dispatch(setDisplayedTags(filteredTags));
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // 空検索時のクエリストリング削除
    if (!value && typeof router.query.q !== "undefined") router.push("/search");
    if (!value) return;

    router.push({
      pathname: "search",
      query: { q: value },
    });
    // setIsPostsLoading(true);
  };

  const handleEnter = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    handleSubmit({ key: "Enter" } as React.KeyboardEvent<HTMLInputElement>);
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
          onFocus={handleToggleFocus}
          onBlur={handleToggleFocus}
          onChange={handleChange}
          onKeyPress={handleSubmit}
          value={value}
          placeholder="キーワードを入力"
          borderRadius="3xl"
          size="lg"
        />
        {isFocus && !isDisabled && (
          <InputRightElement h="12" w="auto">
            <Box pr="3">
              <Kbd
                px="3"
                py="1"
                fontWeight="medium"
                borderRadius="2xl"
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                display="block"
                onClick={handleEnter}
                _active={{
                  borderBottomWidth: "0",
                  marginTop: "3px",
                }}
              >
                Enterで検索
              </Kbd>
            </Box>
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};
