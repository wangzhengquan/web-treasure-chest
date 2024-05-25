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
  "/swiper/nature-1.jpg",
  "/swiper/nature-2.jpg",
  "/swiper/nature-3.jpg",
  "/swiper/nature-4.jpg",
  "/swiper/nature-5.jpg",
  "/swiper/nature-6.jpg",
  "/swiper/nature-7.jpg",
  "/swiper/nature-8.jpg",
];
 

export default function App() {
  
  return (
    <div className='h-[calc(100vh_-_48px)]'>
      <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        style={{
          '--swiper-pagination-bullet-inactive-color': 'hsl(var(--foreground))',
        } as React.CSSProperties}
        className={`!w-[80%] !h-[70%] top-[15%] md:!w-[500px] md:!h-[500px]`}
      >
      {
        imgUrls.map((imgUrl, index) => {
          return (
            <SwiperSlide className="bg-center bg-cover !w-full !h-full" key={index}>
              <img className='block w-full h-full object-cover' src={imgUrl} alt={`swiper nature picture`} />
            </SwiperSlide>
          );
        })
      }
      </Swiper>
    </div>
  );
}
