function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" >
      <path
        fill="#bcbfc4"
        d="M9.5 1C14.2 1 18 4.8 18 9.5S14.2 18 9.5 18 1 14.2 1 9.5 4.8 1 9.5 1m0-1C4.3 0 0 4.3 0 9.5S4.3 19 9.5 19 19 14.7 19 9.5 14.7 0 9.5 0z"
      />
      <path stroke="#bcbfc4" strokeMiterlimit={10} d="M5.2 5.2L13.8 13.8" />
      <path stroke="#bcbfc4" strokeMiterlimit={10} d="M14.1 4.9L4.9 14.1" />
    </svg>
  )
}

function ListItem() {
  return (
    <li role="item" className="item group" style={{ marginTop: 0 }}>
      <div className="item-content box-border min-h-[44px] flex justify-between items-start pl-[15px]">
        <div role="item-media" className="item-media peer flex shrink-0 flex-nowrap box-border items-center pt-[13px] pb-2.5">
          <img
            className="block"
            width={44}
            height={44}
            style={{ borderRadius: "100%" }}
            src="/customers/balazs-orban.png"
          />
        </div>
        <div className="item-inner peer-[.item-media]:ml-[15px] relative w-full min-h-[44px] box-border block overflow-hidden justify-between items-center self-stretch pr-[15px] pt-2.5 pb-[9px]">
          <div className="item-title-row flex justify-between">
            <div className="item-title font-medium shrink min-w-0 whitespace-nowrap relative overflow-hidden text-ellipsis max-w-full">My Awesome App</div>
            <div className="item-after whitespace-nowrap  shrink-0 flex max-h-7 overflow-hidden text-ellipsis ml-[5px]">
              <a href="#" className="close-notification hidden w-[19px] h-[19px] bg-[center_top] bg-no-repeat bg-[100%_auto] relative">
                <CloseIcon />
              </a>
            </div>
          </div>
          <div className="item-subtitle text-[14px] font-light relative overflow-hidden whitespace-nowrap max-w-full text-ellipsis">New message from John Doe</div>
          <div className="item-text text-[13px] opacity-60 leading-[21px] relative overflow-hidden h-[42px] text-ellipsis">
            Hello, how are you? Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Aenean ut posuere erat. Pellentesque id elementum
            urna, a aliquam ante. Donec vitae volutpat orci. Aliquam sed
            molestie risus, quis tincidunt dui.
          </div>
          <hr className="group-[li&.item:last-child]:hidden absolute h-px w-full bg-border opacity-40 block z-[15] origin-[50%_100%] scale-y-50 left-0 right-auto top-auto bottom-0"/>
        </div>
      </div>
    </li>
  );
}

export function List() {
  return (
    <div role="list group"
      className="list-block media-list"
      style={{ display: "block", transform: "translate3d(0px, 0px, 0px)" }}
    >
      <ul>
        <ListItem />
        <ListItem />
        
      </ul>
    </div>

  );
}