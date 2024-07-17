import React from "react";
import "./Footer.scss";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
          <div className="item">
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
          <div className="item">
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
          <div className="item">
            <h2>Categorias</h2>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
            <span>Mantenimiento</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Laburapp.</h2>
            <span>™ Laburapp. 2024 ®</span>
          </div>
          <div className="right">
            <div className="social">
              <a target="_blank" href="https://www.instagram.com/">
                <RiInstagramFill className="icon" />
              </a>
              <a target="_blank" href="">
                <BsTwitterX className="icon" />
              </a>
              <a target="_blank" href="">
                <FaLinkedin className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
