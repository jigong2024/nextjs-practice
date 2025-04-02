import React from "react";

type DropDownProps = {
  handleClickDropDownList: (dropDownItem: string) => void;
  dropDownList: string[];
  setDropDownItemIndex: React.Dispatch<React.SetStateAction<number>>;
  dropDownItemIndex: number;
};

const DropDown = ({
  handleClickDropDownList,
  dropDownList,
  setDropDownItemIndex,
  dropDownItemIndex,
}: DropDownProps) => {
  return (
    <div className="border border-gray-300 border-t-0 rounded-b-lg">
      {/* dropDownList가 없으면 없다는 메세지를 나타냅니다 */}
      {dropDownList.length === 0 && (
        <div className="p-4">해당하는 단어가 없습니다.</div>
      )}
      {/* dropDownList가 존재한다면 dropDownList를 map으로 돌면서 각각의 Item에 onClick handler, mouse */}
      {dropDownList.map((item, index) => {
        return (
          <ul
            className={`p-4 cursor-pointer ${
              index === dropDownItemIndex
                ? "bg-pink-100 text-pink-500 font-bold"
                : "bg-white"
            }`}
            key={index}
            onClick={() => handleClickDropDownList(item)}
            onMouseOver={() => setDropDownItemIndex(index)}
          >
            <li>{item}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default DropDown;
