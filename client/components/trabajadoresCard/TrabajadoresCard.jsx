import React, { useState } from "react";
import "./TrabajadoresCard.scss";
import Link from "next/link";
import { FaHeart, FaStar, FaRegHeart  } from "react-icons/fa";
import { TbPlayerTrackNext } from "react-icons/tb";



const TrabajadoresCard = ({ item }) => {

  const [fav, setFav] = useState(false)

  return (
    <div className="link">
      <div className="laburoCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="star">
            <FaStar className="starIcon"/>
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <div onClick={()=>{setFav(!fav)}}>
            {fav ? (<FaHeart className="heart"/>) : (<FaRegHeart className="heart"/>)}
          </div>
          <Link href="/" className="button">
            Contratar
            <TbPlayerTrackNext className="nextIcon"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrabajadoresCard;
