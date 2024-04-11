import { Bars3Icon } from '@heroicons/react/24/outline';
import {TOnCollapse} from "@/app/lib/definitions";

export default function CollapseButton({} ) {
  return (
    <label className="relative cursor-pointer">
      <Bars3Icon className="h-6 w-6"/>
      <input 
      className="absolute inset-0 w-full h-full invisible"
      type="checkbox" 
      defaultChecked={false}
      id="left-panel-collapse-btn"
      // checked={collapsed} 
      // onChange={(e) => onCollapse(e.target.checked)} 
      />
    </label>
  );
}
