"use client";

import { useEffect } from "react";
import useDropDown from "../hooks/useDropDown";
import DropDown from "./DropDown";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

type FormValue = {
  keyword: string;
};

const SearchSection = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      keyword: "",
    },
    mode: "onSubmit",
  });

  const inputValue = watch("keyword");

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

  const onSubmit = (data: FormValue) => {
    console.log("제출된 데이터:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-id="search-form"
      className="flex flex-col w-[600px]"
    >
      <div className="relative flex gap-4">
        <input
          type="text"
          id="keyword"
          {...register("keyword", { required: "검색어를 입력해주세요." })}
          onKeyDown={handleDropDownKeyDown}
          autoComplete="off"
          className="w-full border border-black p-4 rounded-lg"
        />
        <button
          type="submit"
          className="absolute right-0 flex justify-center items-center w-[10%] h-[100%]"
        >
          <Search />
        </button>
      </div>

      {/* 유효성 검사 오류 메시지 표시 */}
      {errors.keyword && (
        <p className="text-red-500 mt-1">{errors.keyword.message}</p>
      )}

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
