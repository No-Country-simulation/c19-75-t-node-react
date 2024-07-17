import React, { useState } from "react";
import "./LaburoCard.scss";
import Link from "next/link";
import { FaHeart, FaStar, FaRegHeart } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";

const LaburoCard = ({ item }) => {
  const [fav, setFav] = useState(false);

  return (
    <div className="link">
      <div className="laburoCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <div className="username">
              <img src={item.pp} alt="" />
              <span>{item.username}</span>
            </div>
            <span>{item.ubi}</span>
          </div>
          <h2 className="title">{item.title}</h2>
          <p>{item.desc}</p>
          <div className="star">
            <FaStar className="starIcon" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <div
            onClick={() => {
              setFav(!fav);
            }}
          >
            {fav ? (
              <FaHeart className="heart" />
            ) : (
              <FaRegHeart className="heart" />
            )}
          </div>
          <Link href="/" className="button">
            Postularme
            <TbPlayerTrackNext className="nextIcon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaburoCard;
