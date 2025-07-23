function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
      <path
        fill="#bcbfc4"
        d="M9.5 1C14.2 1 18 4.8 18 9.5S14.2 18 9.5 18 1 14.2 1 9.5 4.8 1 9.5 1m0-1C4.3 0 0 4.3 0 9.5S4.3 19 9.5 19 19 14.7 19 9.5 14.7 0 9.5 0z"
      />
      <path stroke="#bcbfc4" strokeMiterlimit={10} d="M5.2 5.2L13.8 13.8" />
      <path stroke="#bcbfc4" strokeMiterlimit={10} d="M14.1 4.9L4.9 14.1" />
    </svg>
  );
}

function ListItem() {
  return (
    <li role="item" className="item group" style={{ marginTop: 0 }}>
      <div className="item-content box-border flex min-h-[44px] items-start justify-between pl-[15px]">
        <div
          role="item-media"
          className="item-media peer box-border flex shrink-0 flex-nowrap items-center pb-2.5 pt-[13px]"
        >
          <img
            className="block"
            width={44}
            height={44}
            style={{ borderRadius: '100%' }}
            src="/customers/balazs-orban.png"
          />
        </div>
        <div className="item-inner relative box-border block min-h-[44px] w-full items-center justify-between self-stretch overflow-hidden pb-[9px] pr-[15px] pt-2.5 peer-[.item-media]:ml-[15px]">
          <div className="item-title-row flex justify-between">
            <div className="item-title relative min-w-0 max-w-full shrink overflow-hidden text-ellipsis whitespace-nowrap font-medium">
              My Awesome App
            </div>
            <div className="item-after ml-[5px]  flex max-h-7 shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
              <a
                href="#"
                className="close-notification relative hidden h-[19px] w-[19px] bg-[100%_auto] bg-[center_top] bg-no-repeat"
              >
                <CloseIcon />
              </a>
            </div>
          </div>
          <div className="item-subtitle relative max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-light">
            New message from John Doe
          </div>
          <div className="item-text relative h-[42px] overflow-hidden text-ellipsis text-[13px] leading-[21px] opacity-60">
            Hello, how are you? Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum
            urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed
            molestie risus, quis tincidunt dui.
          </div>
          <hr className="absolute bottom-0 left-0 right-auto top-auto z-[15] block h-px w-full origin-[50%_100%] scale-y-50 bg-border opacity-40 group-[li&.item:last-child]:hidden" />
        </div>
      </div>
    </li>
  );
}

export function List() {
  return (
    <div
      role="list group"
      className="list-block media-list"
      style={{ display: 'block', transform: 'translate3d(0px, 0px, 0px)' }}
    >
      <ul>
        <ListItem />
        <ListItem />
      </ul>
    </div>
  );
}
