import { ReactElement,useLayoutEffect, useRef, useState } from 'react';
// import styles from './waterfall-grid.module.css';

 

 
export function decodeImage(img: HTMLImageElement): Promise<HTMLImageElement | void> {
  // if ('decode' in img) {
  //   return img.decode().catch(() => {});
  // }
  
  if (img.complete) {
    return Promise.resolve(img);
  }

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
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
    //   img.decode().finally(()=>{
    //     (item as HTMLElement).style.gridRowEnd = `span ${~~(content?.offsetHeight) + rowGap}`;
    //     (item as HTMLElement).style.visibility = 'visible';
    //   });
    // });
    Promise.allSettled(Array.from(imgs).map(image => image.decode())).finally(()=> {
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
      suppressHydrationWarning
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