'use client';
import React, { useState, useRef, useCallback, useEffect } from "react";
import WaterfallComps from "@/app/ui/common/waterfall-grid";
import { create } from 'zustand';
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useMediaQuery } from 'react-responsive';


// const defimages = [
//   "https://picsum.photos/640/480",
//   "https://picsum.photos/360/640",
//   "https://picsum.photos/480/720",
//   "https://picsum.photos/480/640",
//   "https://picsum.photos/360",
//   "https://picsum.photos/360/520",
//   "https://picsum.photos/520/360",
//   "https://picsum.photos/720/580",
//   "https://picsum.photos/720/640",
//   "https://picsum.photos/720/640",
//   "https://picsum.photos/200/300",
// ];

const defimages = [
  "/imgs/858-720x300.jpg",
  "/imgs/1026-640x480.jpg",
  "/imgs/118-480x640.jpg",
  "/imgs/144-640x480.jpg",
  "/imgs/172-480x720.jpg",
  "/imgs/196-360x360.jpg",
  "/imgs/198-360x640.jpg",
  "/imgs/227-360x640.jpg",
  "/imgs/275-480x720.jpg",
  "/imgs/290-360x640.jpg",
  "/imgs/290-720x580.jpg",
  "/imgs/297-480x720.jpg",
  "/imgs/299-480x720.jpg",
  "/imgs/3-360x520.jpg",
  "/imgs/306-720x640.jpg",
  "/imgs/34-200x300.jpg",
  "/imgs/361-640x480.jpg",
  "/imgs/390-640x480.jpg",
  "/imgs/437-360x360.jpg",
  "/imgs/466-480x640.jpg",
  // "/imgs/481-480x720.jpg",
  // "/imgs/484-720x580.jpg",
  // "/imgs/495-720x640.jpg",
  // "/imgs/521-360x640.jpg",
  // "/imgs/641-720x640.jpg",
  // "/imgs/646-360x360.jpg",
  // "/imgs/692-720x640.jpg",
  // "/imgs/693-480x720.jpg",
  // "/imgs/70-200x300.jpg",
  // "/imgs/700-720x580.jpg",
  // "/imgs/766-360x640.jpg",
  // "/imgs/766-520x360.jpg",
  // "/imgs/834-480x640.jpg",
  // "/imgs/842-360x640.jpg",
  // "/imgs/858-720x640.jpg",
  // "/imgs/896-640x480.jpg",
  // "/imgs/933-200x300.jpg",
  // "/imgs/965-360x520.jpg",
]
type Item = {img: string};
type Store = {
  items: Item[]
  appendItems: (items: Item[]) => void
}

const useStore = create<Store>()((set) => ({
  items: defimages.map((img, i)=>({img: `${img}?random=${i}`})),
  appendItems: (items: Item[]) => set((state) => ({ items: [...state.items, ...items] })),
}))

function WaterfallItem({item}: {item: Item}) {
  const [imgSize, setImgSize] = useState({width:0, height: 0});

  return (
    <a className='bg-card-body block cursor-pointer'
      href={item.img}
      data-pswp-width={imgSize.width}
      data-pswp-height={imgSize.height}
      >
        <img src={item.img} alt="" onLoad={(e)=>{
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const image = e.currentTarget; 
          if (image.height / image.width > viewportHeight / viewportWidth ) {
            const height = viewportHeight;
            const width = image.width * viewportHeight  / image.height;
            setImgSize({width:width, height: height })
          } else {
            const width = viewportWidth;
            const height = image.height * viewportWidth  / image.width;
            setImgSize({width:width, height: height })
          }
         }}/>
        <div className='p-4'>
        A masonry layout is a grid-based design where items are arranged in a way that minimizes vertical gaps between them.
        </div>
      </a>
  );
}

export default function  WaterfallGridDemo() {
  // const [images, setImages] = useState(defimages);
  const items = useStore((state) => state.items)
  const appendItems = useStore((state) => state.appendItems);
  const [loading, setLoading] = useState(true);
  const md = useMediaQuery({query:"(min-width: 768px)"});

  const loadMore =  () => {
    setLoading(true);
    appendItems( defimages.map((img, i)=>({img: `${img}?random=${items.length + i}`})));
  };
  const handleLoadComplete = () => {
    setLoading(false);
  }
  useEffect(()=> {
    const scrollView = document.getElementById('main-scroll-view');
    if (!scrollView) return;
   
     
    function scrollHandler(this: HTMLElement, ev: Event) {
     
      if (loading) return;
      console.log(loading, this.scrollHeight - this.clientHeight*4 - this.scrollTop <= 1 , this.scrollHeight, this.clientHeight, this.scrollTop);
  
      // Check if we are near the bottom of the scrollable content
      if (this.scrollHeight - this.clientHeight*4 - this.scrollTop <= 1) {
        loadMore();
      }
    }
    scrollView.addEventListener('scroll', scrollHandler);
    return ()=> {
      scrollView.removeEventListener('scroll', scrollHandler);
    }
  }, [loading])

  useEffect(() => {

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#waterfall-gallery a",
      // children: "a",
      pswpModule: () => import("photoswipe")
    });

    lightbox.init();
    return () => {
      lightbox.destroy();
    }

  }, [items.length])

  return (
    <>
      <WaterfallComps id="waterfall-gallery" columns={md ? 4:2} rowGap={16} onLoadComplete={handleLoadComplete}>
        {items.map((item, index) => {
          return <WaterfallItem item={item} key={index}/>;
        })}
      </WaterfallComps>
      {
        loading ? <div style={{ textAlign: "center", padding: '16px'}}>Loading...</div>: ''
      }
      {/* <div style={{ textAlign: "center" }}>
        <button
          onClick={() => handleSearchImage()}
          style={{ margin: "30px auto" }}
        >
          LOAD MORE
        </button>
      </div> */}
    </>
  );
}
 
