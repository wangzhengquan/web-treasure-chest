'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import './styles.css';
// import required modules
import {Autoplay, EffectCube, Pagination } from 'swiper/modules';

const imgUrls = [
  "/swiper/nature-1.jpg",
  "/swiper/nature-2.jpg",
  "/swiper/nature-3.jpg",
  "/swiper/nature-4.jpg",
  "/swiper/nature-5.jpg",
  "/swiper/nature-6.jpg",
  "/swiper/nature-7.jpg",
  "/swiper/nature-8.jpg",
  "/swiper/nature-9.jpg",
];
export default function App() {
  return (
    <div className='h-[calc(100vh_-_48px)]'>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[Autoplay, EffectCube, Pagination]}
        style={{
          '--swiper-pagination-bullet-inactive-color': 'hsl(var(--foreground))',
          overflow: "visible",
        } as React.CSSProperties}
        className={`!w-[80%] !h-[70%] top-[15%] md:!absolute md:!w-[400px] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2`}
      >
        {
          imgUrls.map((imgUrl, index) => {
            return (
              <SwiperSlide className="bg-center bg-cover !w-full !h-full" key={index}>
                <img className='block object-cover w-full h-full' src={imgUrl} alt={`swiper nature picture`} />
              </SwiperSlide>
            );
          })
        }
         
      </Swiper>
    </div>
  );
}
