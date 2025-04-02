"use client";

import { useEffect, useState } from "react";
import useDropDown from "../hooks/useDropDown";
import DropDown from "./DropDown";
import { Search } from "lucide-react";

const SearchSection = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const {
    handleDropDownKeyDown,
    isFocus,
    handleClickDropDownList,
    dropDownList,
    setDropDownItemIndex,
    dropDownItemIndex,
  } = useDropDown(inputValue);

  useEffect(() => {
    console.log("이벤트 =>", inputValue);
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      return alert("검색어를 입력해주세요!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-id="search-form"
      className="flex flex-col w-[600px]"
    >
      <div className="flex gap-4">
        <input
          type="text"
          id="keyword"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleDropDownKeyDown}
          autoComplete="off"
          placeholder="검색어를 입력해주세요."
          className="w-full border border-black p-4 rounded-lg"
        />
        <button
          type="submit"
          className="flex justify-center items-center w-[10%] border border-black rounded-lg"
        >
          <Search />
        </button>
      </div>

      {isFocus && (
        <DropDown
          handleClickDropDownList={handleClickDropDownList}
          dropDownList={dropDownList}
          setDropDownItemIndex={setDropDownItemIndex}
          dropDownItemIndex={dropDownItemIndex}
        />
      )}
    </form>
  );
};

export default SearchSection;
