import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PREVIEW_LIST } from "../mocks/searchData";

const useDropDown = (inputValue: string) => {
  const router = useRouter();
  const [dropDownList, setDropDownList] = useState<string[]>(PREVIEW_LIST);
  const [dropDownItemIndex, setDropDownItemIndex] = useState<number>(-1);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const updatedDropDownList = () => {
    if (inputValue.trim() === "") {
      setDropDownList([]);
      return;
    }

    const getRelatedKeywordArr = PREVIEW_LIST.filter(
      (textItem) =>
        textItem.includes(inputValue.toLocaleLowerCase()) ||
        textItem.includes(inputValue.toUpperCase())
    );

    setDropDownList(getRelatedKeywordArr);
    setDropDownItemIndex(-1);
  };

  const handleDropDownKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.trim() === "" || e.nativeEvent.isComposing) return;

    // 아래 방향 키보드 누를 경우
    if (e.code === "ArrowDown") {
      if (dropDownItemIndex === dropDownList.length - 1) {
        setDropDownItemIndex(-1);
      } else {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }
    }

    // 위 방향 키보드 누를 경우
    if (e.code === "ArrowUp") {
      if (dropDownItemIndex === -1) {
        setDropDownItemIndex(dropDownList.length - 1);
      } else {
        setDropDownItemIndex(dropDownItemIndex - 1);
      }
    }

    // Enter 키보드 누를 경우
    if (e.code === "Enter") {
      const keyWord = dropDownList[dropDownItemIndex]
        ? dropDownList[dropDownItemIndex]
        : inputValue;

      router.push(`/search?keyword=${keyWord}`);
    }
  };

  const handleClickSearchBox = (e: MouseEvent) => {
    const isFocus = (e.target as HTMLElement).closest("form")?.dataset.id;

    if (isFocus) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  };

  const handleClickDropDownList = (dropDownItem: string) => {
    router.push(`/search?keyword=${dropDownItem}`);
  };

  useEffect(() => {
    updatedDropDownList();
  }, [inputValue]);

  useEffect(() => {
    window.addEventListener("click", handleClickSearchBox);
    return () => {
      window.removeEventListener("click", handleClickSearchBox);
    };
  }, []);

  return {
    handleClickDropDownList,
    handleDropDownKeyDown,
    isFocus,
    dropDownList,
    setDropDownItemIndex,
    dropDownItemIndex,
  };
};

export default useDropDown;
