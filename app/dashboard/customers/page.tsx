"use client";
let count = 0;
const handleClick = () => {
  count += 1;
  console.log(count);
}
export default function Page() {

  return (
  <div className="w-full">
    <div className="w-full items-center justify-between">
      <h1 className={`text-xl`}>Customers</h1>
      <button className="
        text-white
        bg-blue-500
        hover:bg-blue-700
        rounded
        px-4
        py-2
        text-sm
        font-semibold
        shadow-md
        focus:outline-none
        focus:shadow-outline
        focus:ring-2
        focus:ring-blue-500
        focus:ring-opacity-50
      " onClick={handleClick}>Click</button>
      <div>{count}</div>
    </div>
  </div>
  );
}
