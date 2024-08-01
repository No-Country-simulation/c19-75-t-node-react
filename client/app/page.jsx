'use client';

import React, { useEffect, useState } from 'react';
import '../styles/globals.scss';
import Slide from '@/components/slide/Slide.jsx';
import SliderBasic from '@/components/sliderBasic/SliderBasic'; // Nuevo componente de slider
import Featured from '@/components/featured/Featured.jsx';
import { cards } from '../../client/data.js';
import CatCard from '@/components/catCard/CatCard.jsx';
import ServicesComponent from '@/components/servicesComponent/servicesComponent';
import OficioComp from '@/components/oficioComp/OficioComp';
import ProjectCard from '@/components/projectCard/ProjectCard';
import HomeMarketplace from '@/components/homeMarketplace/HomeMarketplace.jsx';

function Home() {
  const [trabajos, setTrabajos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/trabajos/mejores')
      .then((response) => response.json())
      .then((data) => {
        setTrabajos(data);
      })
      .catch((error) => console.error('Error al obtener los trabajos:', error));
  }, []);

  return (
    <>
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} url={card.url} />
        ))}
      </Slide>
      <ServicesComponent />
      <HomeMarketplace />
      <OficioComp />
      {trabajos.length > 0 && (
        <SliderBasic
          items={trabajos.map((trabajo) => (
            <ProjectCard
              key={trabajo.id}
              titulo={trabajo.titulo}
              nombre={trabajo.nombre}
              apellido={trabajo.apellido}
              foto={trabajo.foto}
              puntuacion={trabajo.puntuacion}
              fotos={trabajo.fotos}
            />
          ))}
        />
      )}
    </>
  );
}

export default Home;
