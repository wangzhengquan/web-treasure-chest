'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import naturePic1 from '../nature-1.jpg'
// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
const imgUrls = [
  '/swiper/nature-1.jpg',
  '/swiper/nature-2.jpg',
  '/swiper/nature-3.jpg',
  '/swiper/nature-4.jpg',
  '/swiper/nature-5.jpg',
  '/swiper/nature-6.jpg',
  '/swiper/nature-7.jpg',
  '/swiper/nature-8.jpg',
];

export default function App() {
  return (
    <div className="h-[calc(100vh_-_78px)]">
      <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        style={
          {
            '--swiper-pagination-bullet-inactive-color':
              'hsl(var(--foreground))',
          } as React.CSSProperties
        }
        className={`top-[15%] !h-[70%] !w-[80%] md:!h-[500px] md:!w-[500px]`}
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
