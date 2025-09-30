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
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

const imgUrls = [
  '/swiper/nature-1.jpg',
  '/swiper/nature-2.jpg',
  '/swiper/nature-3.jpg',
  '/swiper/nature-4.jpg',
  '/swiper/nature-5.jpg',
  '/swiper/nature-6.jpg',
  '/swiper/nature-7.jpg',
  '/swiper/nature-8.jpg',
  '/swiper/nature-9.jpg',
];
export default function App() {
  return (
    <div className="h-[calc(100vh_-_78px)]">
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
        style={
          {
            '--swiper-pagination-bullet-inactive-color':
              'hsl(var(--foreground))',
            overflow: 'visible',
          } as React.CSSProperties
        }
        className={`top-[15%] !h-[70%] !w-[80%] md:!absolute md:left-1/2 md:top-1/2 md:!w-[400px] md:-translate-x-1/2 md:-translate-y-1/2`}
      >
        {imgUrls.map((imgUrl, index) => {
          return (
            <SwiperSlide
              className="!h-full !w-full bg-cover bg-center"
              key={index}
            >
              <img
                className="block h-full w-full object-cover"
                src={imgUrl}
                alt={`swiper nature picture`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
