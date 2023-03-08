import React from "react";
import { ListStyled } from "../styled/list-styled";

const SideBar = ({ onElementClicked }) => {
  const categories = [
    "Home",
    "Playlists",
    "Party Mode",
    "Library",
    "History",
    "Your Videos",
    "Watch Later",
    "Liked Videos",
    "Uploads",
    "Live Streaming",
    "Gaming",
    "Sports",
  ];

  return (
    <ListStyled>
      {categories.map((category) => (
        <li
          className="txt-white"
          key={category}
          onClick={() => onElementClicked(category)}
        >
          {category}
        </li>
      ))}
    </ListStyled>
  );
};

export default SideBar;
