'use client';
import { useRef, useState, useLayoutEffect, useEffect, use } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { createContext } from '@radix-ui/react-context';
import * as Tooltip from '@radix-ui/react-tooltip';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import * as ReactDOM from 'react-dom';
import  './magic-curtain.css';

interface DataItemType  {
  bg: string;
  img: string;
}

// type ItemType = DataItemType & {
//   index: number;
// }

interface NavItemProps extends  DataItemType{
  index: number;
  // previewViewportWrapperRef: React.RefObject<HTMLDivElement>;
  onMouseOver: (index: number) => void;
  onMouseOut: (index: number) => void;
}

interface CurtainItemProps extends React.HTMLProps<HTMLElement>, DataItemType {
  // currentIndex: number;
  index: number;
  // onChangeCurrentIndex: (index: number) => void;
  // visibility: "hidden" | "visible" | "animating-out";
}



const DataItems = [{
  bg: "bg-red-400",
  img: "https://workos.imgix.net/images/2f5a1e4b-39c5-4604-b278-a219f9898159.png?auto=format&fit=clip&q=80&w=496",
}, {
  bg: "bg-emerald-400",
  img: "https://workos.imgix.net/images/5516f53e-0b29-4fc2-92d8-74566aa91976.png?auto=format&fit=clip&q=80&w=496"
}, {
  bg: "bg-yellow-400",
  img: "https://workos.imgix.net/images/59b77353-32f4-4176-ac36-8299ed7c1236.png?auto=format&fit=clip&q=80&w=496"
}, {
  bg: "bg-green-400",
  img: "https://workos.imgix.net/images/bc735904-1193-48a0-bcc6-37c9b73312fa.png?auto=format&fit=clip&q=80&w=496"
}, {
  bg: "bg-indigo-400",
  img: "https://workos.imgix.net/images/bde22677-6a86-495a-baf9-7328e8f52401.png?auto=format&fit=clip&q=80&w=496"
}, {
  bg: "bg-blue-400",
  img: "https://workos.imgix.net/images/f6c9aea7-8bcc-458a-8531-3b36458dc031.png?auto=format&fit=clip&q=80&w=496"
}];
 

function NavItem(props: NavItemProps) {
  const context = useMagicCurtainContext("NavItem");
  function handleMouseOver(event: React.MouseEvent<HTMLButtonElement>) {
    // console.log("Mouse Enter NavItem");
    props.onMouseOver(props.index);
  }

  function handleMouseOut(event: React.MouseEvent<HTMLButtonElement>) {
    // console.log("Mouse Enter NavItem");
    props.onMouseOut(props.index);
  }

  return (
  <li className="MagicCurtain_MagicCurtainControlsItem" key={props.index}>
    <button
      data-visibility="visible"
      className="MagicCurtain_MagicCurtainControlsTrigger"
      data-highlighted={props.index === context.currentIndex}
      onClick={()=>context.onChangIndex(props.index)}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    />
     
  </li>
  );
}

function PreviewViewport({curtainControlsOffsetIndex }: {curtainControlsOffsetIndex: number}) {
  const previewViewportRef = useRef<HTMLDivElement>(null);
  return (
 
    <div ref={previewViewportRef}
      className="MagicCurtain_MagicCurtainControlsPreviewViewport" 
      data-state="delayed-open"
      >
    {DataItems.map((item, index) =>  
      <div
        key={index}
        data-orientation="horizontal"
        className="MagicCurtain_MagicCurtainControlsPreviewContent"
      >
        {/* <img
          className={`MagicCurtain_MagicCurtainControlsPreviewContentImage bg-${item.bg}`}
          src={item.img}
        /> */}
        <div
          className={`MagicCurtain_MagicCurtainControlsPreviewContentImage ${item.bg}`}
        />
      </div>
    )}
    </div>
  );
}

function Navbar({children}: React.PropsWithChildren<{}>) {
  
  const previewViewportWrapperRef = useRef<HTMLDivElement>(null);
  const [curtainControlsOffsetIndex, setCurtainControlsOffsetIndex] = useState<number>(0);
  
  const handleOnMouseOverItem = (index: number) => {
    setCurtainControlsOffsetIndex(index);
  };
 
  return (
  <div>
    <nav
      aria-label="Main"
      data-orientation="horizontal"
      dir="ltr"
      className="MagicCurtain_MagicCurtainControlsRoot"
      style={{
        position: "absolute",
        zIndex: 1,
        left: "74px",
        bottom: "5px"
      }}
    >
    <Tooltip.Provider>
    <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <div style={{ position: "relative" }}>
        <ul
          data-orientation="horizontal"
          aria-label="Magic Curtain Examples"
          dir="ltr"
          style={{
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 1,
            position: "relative"
          }}
        >
           
          {DataItems.map((item, index) => <NavItem {...item}  key={index} index={index}  onMouseOver={handleOnMouseOverItem} onMouseOut={()=>{}}/> )}
        </ul>
      </div>
    </Tooltip.Trigger>
      <Tooltip.Content
        side="left"
        // sideOffset={5}
        ref={previewViewportWrapperRef}
        className="MagicCurtain_MagicCurtainControlsPreviewViewportWrapper"
        style={{
          position: "absolute",
          "--magic-curtain-controls-offset-index": curtainControlsOffsetIndex,
        } as React.CSSProperties & {"--magic-curtain-controls-offset-index": number} } 
      >
        <PreviewViewport curtainControlsOffsetIndex={curtainControlsOffsetIndex}/>
      </Tooltip.Content>
      </Tooltip.Root>
      </Tooltip.Provider>
    </nav>
  </div>
  );
}

function CurtainItem({index, ...props}: CurtainItemProps) {
  const preIndex = useRef<number>(0);
  const curtainItemRef = useRef<HTMLDivElement>(null);
  const context = useMagicCurtainContext("CurtainItem");
  const setVisibility = (visibility: "hidden" | "visible" | "animating-out") => {
    if (!curtainItemRef.current) return;
    curtainItemRef.current.setAttribute("data-visibility", visibility);
  };  
  useLayoutEffect(()=>{
    if (!curtainItemRef.current) return;
    const originalVisibility = curtainItemRef.current.getAttribute("data-visibility");
    // console.log(index, context.currentIndex, originalVisibility);
    if (context.currentIndex===index) {
      setVisibility("visible");
    } else if(originalVisibility==='visible' && context.currentIndex !== index) {
      setVisibility("animating-out");
      const handleAnimationEnd = (event: AnimationEvent) => {
        setVisibility("hidden");
        // ReactDOM.flushSync(() =>  setVisibility("hidden"));
      };
  
      curtainItemRef.current.addEventListener('animationend', handleAnimationEnd);
      return () => {
        curtainItemRef.current?.removeEventListener('animationend', handleAnimationEnd);
      };
    } else {
      setVisibility("hidden");
    }
    preIndex.current = context.currentIndex;
    
  }, [context.currentIndex, index]);

   
  return (
    <div ref={curtainItemRef}
      data-visibility={"hidden"} 
      className={`MagicCurtain_MagicCurtainItem grid place-content-center h-full font-extrabold text-9xl text-white ${props.bg}`}>
      {index}
    </div>
  );
}

type MagicCurtainContextValue = {
  currentIndex: number;
  onChangIndex: (index: number) => void;
};

const [MagicCurtainProvider, useMagicCurtainContext] =
  createContext<MagicCurtainContextValue>("MagicCurtain");

export default function MagicCurtain() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const magicCurtainRootRef = useRef<HTMLDivElement>(null);
  function handleChangIndex(index: number) {
    setCurrentIndex(index);
  }
  return (
    <MagicCurtainProvider currentIndex={currentIndex} onChangIndex={handleChangIndex}>
      <div ref={magicCurtainRootRef} className="MagicCurtain_MagicCurtainRoot min-h-full h-full">
        {DataItems.map((item, index) => <CurtainItem {...item} key={index} index={index}  />)}
        <Navbar/>
      </div>
    </MagicCurtainProvider>

  );
} 