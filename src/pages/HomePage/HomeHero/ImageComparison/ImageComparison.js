import './ImageComparison.scss'
import React, { useEffect } from 'react';
import { MdCompareArrows } from "react-icons/md";

export default function ImageComparison({
  beforeSrc,
  afterSrc}) {

  useEffect(() => {
    const slider = document.querySelector(".slider");
    const image1 = document.querySelector(".image-1");
    const image2 = document.querySelector(".image-2");
    const thumb = document.querySelector(".thumb");

    slider.addEventListener("input", () => {
    const value = slider.value / 10;
    image1.style.width = `${value}%`;
    image2.style.width = `${100 - value}%`;
    thumb.style.left = `${value}%`;
    });
  }, []);

  return (
    <div className="image-comparison box-shadow">
        <img className="image image-1" src={beforeSrc} alt=""/>
        <img className="image image-2" src={afterSrc} alt=""/>
        <input className="slider" type="range" min="0" max="1000"/>
        <div className="thumb box-shadow">
           <MdCompareArrows/>
        </div>
    </div>
  );
}