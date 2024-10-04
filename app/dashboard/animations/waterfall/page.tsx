'use client';
import Main from '@/app/ui/main';
import { UpdateBreadcrumbs } from '@/app/ui/indicator/breadcrumbs';

import React, { useState, useRef, useCallback, useEffect } from "react";
import WaterfallComps from "@/app/ui/common/waterfall-grid";
import { create } from 'zustand';
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";


const defimages = [
  "https://picsum.photos/640/480",
  "https://picsum.photos/360/640",
  "https://picsum.photos/480/720",
  "https://picsum.photos/480/640",
  "https://picsum.photos/360",
  "https://picsum.photos/360/520",
  "https://picsum.photos/520/360",
  "https://picsum.photos/720/580",
  "https://picsum.photos/720/640",
  "https://picsum.photos/720/640",
  "https://picsum.photos/200/300",
];
type Item = {img: string};
type Store = {
  items: Item[]
  appendItems: (items: Item[]) => void
}

const useStore = create<Store>()((set) => ({
  items: defimages.map((img)=>({img: `${img}?random=${random(1, 10000)}`})),
  appendItems: (items: Item[]) => set((state) => ({ items: [...state.items, ...items] })),
}))


function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

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
          if (viewportHeight < viewportWidth) {
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

function WaterfallGridDemo() {
  // const [images, setImages] = useState(defimages);
  const items = useStore((state) => state.items)
  const appendItems = useStore((state) => state.appendItems);
  const [loading, setLoading] = useState(true);
  const loadMore =  () => {
    setLoading(true);
    appendItems( defimages.map((img)=>({img: `${img}?random=${random(1, 10000)}`})));
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
      <WaterfallComps id="waterfall-gallery" rowGap={16} onLoadComplete={handleLoadComplete}>
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

export default function Page() {
  
  
   
  return (
    <Main className="h-full w-full"  >
      <UpdateBreadcrumbs breadcrumbs={'Waterfall'} />
      <WaterfallGridDemo />
    </Main>
  );
}
