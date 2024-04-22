"use client";
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ModeToggle from "@/app/components/mode-toggle"
let count = 0;
const handleClick = () => {
  count += 1;
  console.log(count);
}
export default function Page() {

  return (
  <div className="w-full px-4">
    <h1 className={`text-xl`}>Customers</h1>
    <div>
      <ModeToggle />
    </div>
    <Button>Click2</Button>
    <div className="w-5 h-5"></div>
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
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
      
  </div>
  );
}
