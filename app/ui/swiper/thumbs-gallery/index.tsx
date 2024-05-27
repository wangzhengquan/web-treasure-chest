'use client';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

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
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  return (
    <div className='h-[calc(100vh_-_78px)]'>
      <Swiper
         style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          '--swiper-pagination-bullet-inactive-color': 'hsl(var(--foreground))',
          width: '100%',
          height: '80%',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        // thumbs={{ swiper: thumbsSwiper }}
        modules={[ FreeMode, Navigation, Thumbs]}
      >
      {
        imgUrls.map((imgUrl, index) => {
          return (
            <SwiperSlide className="" key={index}>
              <img className='block w-full h-full object-cover' src={imgUrl} alt={`swiper nature picture`} />
            </SwiperSlide>
          );
        })
      }
         
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={`!h-[20%] !py-[10px] box-border bg-black`}
      >
      {
        imgUrls.map((imgUrl, index) => {
          return (
            <SwiperSlide 
              style={{width:'25%', height: '100%'}}
              className="box-border bg-cover bg-center opacity-40 [&.swiper-slide-thumb-active]:opacity-100" key={index}>
              <img className='block w-full h-full object-cover' src={imgUrl} alt={`swiper nature picture`} />
            </SwiperSlide>
          );
        })
      }
         
         
      </Swiper>
    </div>
  );
}


