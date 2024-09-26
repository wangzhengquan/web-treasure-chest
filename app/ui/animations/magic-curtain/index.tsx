'use client';
import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  forwardRef,
} from 'react';
import { createContext } from '@radix-ui/react-context';
import { Presence } from '@radix-ui/react-presence';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import './magic-curtain.css';

interface DataItemType {
  bg: string;
  img: string;
}

interface NavItemProps extends DataItemType {
  index: number;
}

interface CurtainItemProps extends React.HTMLProps<HTMLElement>, DataItemType {
  index: number;
  defaultVisibility: 'hidden' | 'visible' | 'animating-out';
}

type MagicCurtainContextValue = {
  magicCurtainIndex: number;
  onMagicCurtainIndexChang(index: number): void;
};

const [MagicCurtainProvider, useMagicCurtainContext] =
  createContext<MagicCurtainContextValue>('MagicCurtain');

type PreviewContextValue = {
  open: boolean;
  magicCurtainControlsOffsetIndex: number;
  onMagicCurtainControlsOffsetIndexChange(index: number): void;
  onOpen(): void;
  onClose(): void;
  onAnimationEnd?(): void;
  onAnimationStart?(): void;
};

const [PreviewProvider, usePreviewContext] =
  createContext<PreviewContextValue>('Preview');

const DataItems = [
  {
    bg: 'bg-red-400',
    img: 'https://workos.imgix.net/images/2f5a1e4b-39c5-4604-b278-a219f9898159.png?auto=format&fit=clip&q=80&w=496',
  },
  {
    bg: 'bg-emerald-400',
    img: 'https://workos.imgix.net/images/5516f53e-0b29-4fc2-92d8-74566aa91976.png?auto=format&fit=clip&q=80&w=496',
  },
  {
    bg: 'bg-yellow-400',
    img: 'https://workos.imgix.net/images/59b77353-32f4-4176-ac36-8299ed7c1236.png?auto=format&fit=clip&q=80&w=496',
  },
  {
    bg: 'bg-green-400',
    img: 'https://workos.imgix.net/images/bc735904-1193-48a0-bcc6-37c9b73312fa.png?auto=format&fit=clip&q=80&w=496',
  },
  {
    bg: 'bg-indigo-400',
    img: 'https://workos.imgix.net/images/bde22677-6a86-495a-baf9-7328e8f52401.png?auto=format&fit=clip&q=80&w=496',
  },
  {
    bg: 'bg-blue-400',
    img: 'https://workos.imgix.net/images/f6c9aea7-8bcc-458a-8531-3b36458dc031.png?auto=format&fit=clip&q=80&w=496',
  },
];

function getAnimationName(styles?: CSSStyleDeclaration) {
  return styles?.animationName || 'none';
}

function MagicCurtainControlsTrigger(props: NavItemProps) {
  const context = useMagicCurtainContext('NavItem');
  const previewContext = usePreviewContext('NavItem');
  function handlePointerEnter(event: React.MouseEvent<HTMLButtonElement>) {
    // console.log("Mouse Enter NavItem");
    if (previewContext.magicCurtainControlsOffsetIndex !== props.index) {
      previewContext.onMagicCurtainControlsOffsetIndexChange(props.index);
    }
    previewContext.onOpen();
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    context.onMagicCurtainIndexChang(props.index);
    previewContext.onClose();
  }

  return (
    <button
      data-visibility="visible"
      className="MagicCurtain_MagicCurtainControlsTrigger"
      data-highlighted={props.index === context.magicCurtainIndex}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
    />
  );
}

const MagicCurtainControlsPreviewViewport = forwardRef(({}, ref: any) => {
  const previewContext = usePreviewContext('NavItem');
  const previewViewportRef = useRef<HTMLDivElement>(null);
  const refs = useComposedRefs(ref, previewViewportRef);
  useLayoutEffect(() => {
    if (!previewViewportRef.current) return;
    const previewViewport = previewViewportRef.current;

    const onAnimationEnd = (event: AnimationEvent) => {
      // console.log('MagicCurtainControlsPreviewViewport AnimationEnd 1', event);
      const currentAnimationName = getAnimationName(
        getComputedStyle(previewViewport),
      );
      const isCurrentAnimation = currentAnimationName.includes(
        event.animationName,
      );
      if (event.target === previewViewport && isCurrentAnimation) {
        // console.log('MagicCurtainControlsPreviewViewport AnimationEnd 2', event);
        previewContext.onAnimationEnd?.();
      }
    };

    const onAnimationStart = (event: AnimationEvent) => {
      // console.log('MagicCurtainControlsPreviewViewport handleAnimationStart', event);
      if (event.target === previewViewport) {
        // console.log('MagicCurtainControlsPreviewViewport handleAnimationStart 2', event);
        // if animation occurred, store its name as the previous animation.
        previewContext.onAnimationStart?.();
      }
    };

    previewViewport.addEventListener('animationstart', onAnimationStart);
    previewViewport.addEventListener('animationend', onAnimationEnd);
    return () => {
      previewViewport.removeEventListener('animationstart', onAnimationStart);
      previewViewport.removeEventListener('animationend', onAnimationEnd);
    };
  }, [previewViewportRef.current, previewContext]);
  return (
    <div
      ref={refs}
      className="MagicCurtain_MagicCurtainControlsPreviewViewport"
      data-state={previewContext.open ? 'open' : 'closed'}
    >
      {DataItems.map((item, index) => (
        <div
          key={index}
          className="MagicCurtain_MagicCurtainControlsPreviewContent"
        >
          {/* <img
          className={`MagicCurtain_MagicCurtainControlsPreviewContentImage bg-${item.bg}`}
          src={item.img}
        /> */}
          <div
            className={`MagicCurtain_MagicCurtainControlsPreviewContentImage text-2xl font-bold text-white ${item.bg}`}
          >
            {previewContext.magicCurtainControlsOffsetIndex}
          </div>
        </div>
      ))}
    </div>
  );
});

MagicCurtainControlsPreviewViewport.displayName =
  'MagicCurtainControlsPreviewViewport';

function MagicCurtainControls({ children }: React.PropsWithChildren<{}>) {
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const previewViewportWrapperRef = useRef<HTMLDivElement>(null);
  const magicCurtainControlsRootRef = useRef<HTMLDivElement>(null);
  const [magicCurtainControlsOffsetIndex, setMagicCurtainControlsOffsetIndex] =
    useState<number>(0);

  const handleOpen = () => {
    // setAnimating(true);
    setOpen(true);
  };

  const handleClose = () => {
    // ReactDOM.flushSync(() => {
    //   setAnimating(true);
    //   setOpen(false);
    // });
    setAnimating(true);
    setOpen(false);
  };

  const handleAnimationEnd = useCallback(() => {
    setAnimating(false);
  }, [setAnimating, open, animating]);

  // const handleAnimationStart = () => {
  //   setAnimating(true);
  // }

  useEffect(() => {
    const handleTrackPointerGrace = (event: PointerEvent) => {
      const magicCurtainControlsRoot = magicCurtainControlsRootRef.current;
      const previewViewportWrapper = previewViewportWrapperRef.current;
      const target = event.target as HTMLElement;
      const hasEnteredTarget =
        magicCurtainControlsRoot?.contains(target) ||
        previewViewportWrapper?.contains(target);

      if (!hasEnteredTarget && open) {
        handleClose();
      }
    };

    document.addEventListener('pointermove', handleTrackPointerGrace);
    return () =>
      document.removeEventListener('pointermove', handleTrackPointerGrace);
  }, [open]);
  return (
    <PreviewProvider
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onAnimationEnd={handleAnimationEnd}
      // onAnimationStart={handleAnimationStart}
      magicCurtainControlsOffsetIndex={magicCurtainControlsOffsetIndex}
      onMagicCurtainControlsOffsetIndexChange={
        setMagicCurtainControlsOffsetIndex
      }
    >
      <div>
        <nav
          ref={magicCurtainControlsRootRef}
          className="MagicCurtain_MagicCurtainControlsRoot"
          style={{
            position: 'absolute',
            zIndex: 1,
            left: '5px',
            bottom: '5px',
          }}
        >
          <div style={{ position: 'relative' }}>
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                zIndex: 1,
                position: 'relative',
              }}
            >
              {DataItems.map((item, index) => (
                <li
                  className="MagicCurtain_MagicCurtainControlsItem"
                  key={index}
                >
                  <MagicCurtainControlsTrigger {...item} index={index} />
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={previewViewportWrapperRef}
            className="MagicCurtain_MagicCurtainControlsPreviewViewportWrapper"
            style={
              {
                display: open || animating ? 'block' : 'none',
                '--magic-curtain-controls-offset-index':
                  magicCurtainControlsOffsetIndex,
              } as React.CSSProperties & {
                '--magic-curtain-controls-offset-index': number;
              }
            }
          >
            <Presence present={open}>
              <MagicCurtainControlsPreviewViewport />
            </Presence>
          </div>
        </nav>
      </div>
    </PreviewProvider>
  );
}

function MagicCurtainItem({
  index,
  defaultVisibility,
  ...props
}: CurtainItemProps) {
  const preIndex = useRef<number>(0);
  const curtainItemRef = useRef<HTMLDivElement>(null);
  const context = useMagicCurtainContext('CurtainItem');
  const setVisibility = (
    visibility: 'hidden' | 'visible' | 'animating-out',
  ) => {
    if (!curtainItemRef.current) return;
    curtainItemRef.current.setAttribute('data-visibility', visibility);
  };
  useEffect(() => {
    if (!curtainItemRef.current) return;
    const originalVisibility =
      curtainItemRef.current.getAttribute('data-visibility');
    // console.log(index, context.magicCurtainIndex, originalVisibility);
    if (context.magicCurtainIndex === index) {
      setVisibility('visible');
    } else if (
      originalVisibility === 'visible' &&
      context.magicCurtainIndex !== index
    ) {
      setVisibility('animating-out');
      const handleAnimationEnd = (event: AnimationEvent) => {
        setVisibility('hidden');
        // ReactDOM.flushSync(() =>  setVisibility("hidden"));
      };

      curtainItemRef.current.addEventListener(
        'animationend',
        handleAnimationEnd,
      );
      return () => {
        curtainItemRef.current?.removeEventListener(
          'animationend',
          handleAnimationEnd,
        );
      };
    } else {
      setVisibility('hidden');
    }
    preIndex.current = context.magicCurtainIndex;
  }, [context.magicCurtainIndex, index]);

  return (
    <div
      ref={curtainItemRef}
      data-visibility={defaultVisibility}
      className={`MagicCurtain_MagicCurtainItem grid h-full place-content-center text-9xl font-extrabold text-white ${props.bg}`}
    >
      {index}
    </div>
  );
}

export default function MagicCurtainRoot() {
  const [magicCurtainIndex, setCurrentIndex] = useState(0);
  const magicCurtainRootRef = useRef<HTMLDivElement>(null);
  function handleChangIndex(index: number) {
    setCurrentIndex(index);
  }
  return (
    <MagicCurtainProvider
      magicCurtainIndex={magicCurtainIndex}
      onMagicCurtainIndexChang={handleChangIndex}
    >
      <div
        ref={magicCurtainRootRef}
        className="MagicCurtain_MagicCurtainRoot h-[calc(100vh_-_78px)]"
      >
        {DataItems.map((item, index) => (
          <MagicCurtainItem
            {...item}
            key={index}
            index={index}
            defaultVisibility={index === 0 ? 'visible' : 'hidden'}
          />
        ))}
        <MagicCurtainControls />
      </div>
    </MagicCurtainProvider>
  );
}
