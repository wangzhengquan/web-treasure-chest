import { ReactElement,useLayoutEffect, useRef, useState } from 'react';
// import styles from './waterfall-grid.module.css';

// 图片加载器
export function loadImagesFunc(imgs: HTMLImageElement[]): Promise<any> {
  const urlArrsPromise = [...imgs].map(image => {
    return new Promise((resolve, reject) => {
      image.onload = function () {
        resolve('image unloded')
      }
      image.onerror = function () {
        reject('image unloded error')
      }
      if (image.complete) {
        resolve('image has loded')
      }
    })
  })
  return Promise.allSettled(urlArrsPromise)
    .then(res => res)
    .catch(err => console.log(err))
}

function loadImage(image: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    if (!image) {
      resolve('');
      return;
    }
    image.onload = function () {
      resolve('image unloded')
    }
    image.onerror = function () {
      reject('image unloded error')
    }
    if (image.complete) {
      resolve('image has loded')
    }
  })
}

type Props = {
  id?:string,
  children?: ReactElement[], 
  className?: string,
  rowGap?: number,
  columnGap?: number,
  columns?: number,
  onLoadComplete?: () => void
};

const Waterfall: React.FC<Props>  = ({id, children, className="", rowGap=0, columnGap=16, columns=4, onLoadComplete}) => {
  const containerRef = useRef<HTMLUListElement>(null)
  const gridItemRef = useRef<HTMLLIElement>(null)
  const [prevChildrenLen, setPrevChildrenLen] = useState( 0);
  useLayoutEffect( () => {
    if (!containerRef.current || !children) return;
    const imgs = containerRef.current.querySelectorAll(`li:nth-last-child(-n + ${children.length - prevChildrenLen}) img`) as NodeListOf<HTMLImageElement>;
    const gridItems = containerRef.current.querySelectorAll(`li:nth-last-child(-n + ${children.length - prevChildrenLen})`);
    // gridItems.forEach((item, index) => {
    //   const img = item.querySelector(':scope img') as HTMLImageElement;
    //   const content = item.querySelector(':scope > *') as HTMLElement;
    //   loadImage(img).finally(()=>{
    //     (item as HTMLElement).style.gridRowEnd = `span ${~~(content?.offsetHeight) + rowGap}`;
    //     (item as HTMLElement).style.visibility = 'visible';
    //   });
    // });
    loadImagesFunc(Array.from(imgs)).finally(()=> {
      gridItems.forEach((item, index) => {
        const content = item.querySelector(':scope > *') as HTMLElement;
        (item as HTMLElement).style.gridRowEnd = `span ${~~(content?.offsetHeight) + rowGap}`;
        (item as HTMLElement).style.visibility = 'visible';
      });
      onLoadComplete?.();
    });
    
    setPrevChildrenLen(children.length);

  }, [children?.length])

   
  
  return (
    <ul id={id} ref={containerRef} className={`${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`, 
        // grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        columnGap: columnGap, 
        gridAutoRows: '1px'
      }}
    >
      {
        children?.map((item, i) => (<li 
          key={i} 
          style={{
            gridRowStart: 'auto',
            height: '100%',
            width: '100%',
            visibility: 'hidden'
          }}
          ref={gridItemRef} 
          className={`[&_img]:w-full [&_img]:h-auto [&_img]:block`}>{item}</li>)
        )
      }
    </ul>
  )
};

export default Waterfall;