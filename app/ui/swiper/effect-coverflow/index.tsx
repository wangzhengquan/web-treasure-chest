'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

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
    <div className='h-[calc(100vh_-_78px)]'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          
        }}
        modules={[ EffectCoverflow, Pagination]}
        style={{
          '--swiper-pagination-bullet-inactive-color': 'hsl(var(--foreground))',
        } as React.CSSProperties}
        className={`w-full !h-[60%] top-[20%] md:!h-[auto] md:py-[50px]`}
      >
        {
          imgUrls.map((imgUrl, index) => {
            return (
              <SwiperSlide className={'bg-center bg-cover !w-[65%] md:!w-[300px] md:!h-[300px] '} key={index}>
                <img className='block w-full h-full object-cover' width="100%" height="100%" src={imgUrl} alt={`swiper nature picture`}/>
              </SwiperSlide>
            );
          })
        }
        
      </Swiper>
       
    </div>
  );
}
