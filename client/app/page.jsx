"use client";

import "./globals.scss";
import Slide from "@/components/slide/Slide.jsx";
import Featured from "@/components/featured/Featured.jsx";
import { cards } from "../../client/data.js";
import CatCard from "@/components/catCard/CatCard.jsx";

export default function Home() {
  return (
    <>
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
    </>
  );
}
