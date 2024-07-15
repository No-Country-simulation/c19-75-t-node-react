"use client";

import "./globals.scss";
import Slide from "@/components/slide/Slide.jsx";
import SlideTrabajos from "@/components/slideTrabajos/SlideTrabajos.jsx";
import Featured from "@/components/featured/Featured.jsx";
import { cards, projects } from "../../client/data.js";
import CatCard from "@/components/catCard/CatCard.jsx";
import ServicesComponent from "@/components/servicesComponent/servicesComponent";
import OficioComp from "@/components/oficioComp/OficioComp";
import ProjectCard from "@/components/projectCard/ProjectCard";

export default function Home() {
  return (
    <>
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <ServicesComponent />
      <OficioComp />
      <SlideTrabajos slidesToShow={4} arrowsScroll={4}>
        {projects.map((project) => (
          <ProjectCard key={project.id} item={project} />
        ))}
      </SlideTrabajos>
    </>
  );
}
