import React from "react";
import { Link } from "react-router-dom";

export default function Button(type, style, link, text) {
  let button;
  if (type === "submit") button = <input type={type} className={style} />;
  if (type === "link")
    button = (
      <Link to={link} className={style}>
        {text}
      </Link>
    );
  return button;
}
