import React from "react";
import openWhite from "../Assets/chevron_right_white_48dp.svg";
import openBlack from "../Assets/chevron_right_black_48dp.svg";
import closeWhite from "../Assets/chevron_left_white_48dp.svg";
import closeBlack from "../Assets/chevron_left_black_48dp.svg";
import downWhite from "../Assets/down_white_48dp.svg";
import downBlack from "../Assets/down_black_48dp.svg";
import upWhite from "../Assets/up_white_48dp.svg";
import upBlack from "../Assets/up_black_48dp.svg";

export const ExpandButton = ({ expand, setExpand, theme }) => {
  return (
    <>
      <button
        className={`flex justify-evenly mr-3 md:hidden`}
        onClick={() => setExpand(!expand)}
      >
        {expand ? (
          theme === "dark" ? (
            <img src={upWhite} alt="close" />
          ) : (
            <img src={upBlack} alt="close" />
          )
        ) : theme === "dark" ? (
          <img src={downWhite} alt="open" />
        ) : (
          <img src={downBlack} alt="open" />
        )}
      </button>
      <button
        className={`mb-20 hidden md:block`}
        onClick={() => setExpand(!expand)}
      >
        {expand ? (
          theme === "dark" ? (
            <img src={closeWhite} alt="close" />
          ) : (
            <img src={closeBlack} alt="close" />
          )
        ) : theme === "dark" ? (
          <img src={openWhite} alt="open" />
        ) : (
          <img src={openBlack} alt="open" />
        )}
      </button>
    </>
  );
};
