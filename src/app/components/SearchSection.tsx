"use client";

import { useEffect, useState } from "react";

const SearchSection = () => {
  const [inputValue, setInputValue] = useState<string>("");

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
    <div className="w-[50%]">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          id="keyword"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          placeholder="검색어를 입력해주세요."
          className="w-full border border-black p-4 rounded-lg"
        />
        <button
          type="submit"
          className="w-[10%] border border-black rounded-lg"
        >
          검색
        </button>
      </form>
    </div>
  );
};

export default SearchSection;
