import React, { useEffect, useRef, useState } from "react";
import styles from "./TrabajosSlider.module.scss";

const TrabajosSlider = ({ data, width = 500, height = 280 }) => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll(`.${styles.listItem}`)[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
        inline: "start", // Asegura que la imagen se alinee correctamente en el eje horizontal
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? 0 : curr - 1;
      });
    } else {
      const isLastSlide = currentIndex === data.length - 1;
      if (!isLastSlide) {
        setCurrentIndex((curr) => curr + 1);
      }
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sliderContainer}>
        <div className={styles.leftArrow} onClick={() => scrollToImage("prev")}>
          &#10092;
        </div>
        <div
          className={styles.rightArrow}
          onClick={() => scrollToImage("next")}
        >
          &#10093;
        </div>
        <div className={styles.containerImages}>
          <ul className={styles.imageList} ref={listRef}>
            {data.map((item) => (
              <li className={styles.listItem} key={item.id}>
                <img className={styles.imageItem} src={item.img} width={width} height={height} />
                <div className={styles.overlay}>
                  <h3>{item.titulo}</h3>
                  <p className={styles.desc}>
                    {item.descripcion}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.dotsContainer}>
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`${styles.dotContainerItem} ${
                idx === currentIndex ? styles.active : ""
              }`}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrabajosSlider;
