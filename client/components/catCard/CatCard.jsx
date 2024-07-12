import React from "react";
import "./CatCard.scss";
import Link from "next/link";

const CatCard = ({ item }) => {
  return (
    <Link href="/">
      <div className="catCard">
        <img src={item.img} alt="" />
            <span className="title">{item.title}</span>
            <span className="subtitle">{item.subTitle}</span>
      </div>
    </Link>
  );
};

export default CatCard;
