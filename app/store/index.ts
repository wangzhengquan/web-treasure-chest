import { create } from 'zustand'
import {Breadcrumb} from '@/app/lib/definitions';
 
type  Store = {
  breadcrumbs: Breadcrumb[],
  setBreadcrumbs: (breadcrumbs: string | Breadcrumb | Breadcrumb[]) => void
   
};

export const useStore = create<Store>()((set, get) => ({
  breadcrumbs: [],
  setBreadcrumbs: (val: string | Breadcrumb | Breadcrumb[]) => {
    if (typeof val === 'string') {
      val = [{ label: val, href: '' }];
    } else if (!Array.isArray(val)) {
      val = [val];
    }
    set(state => ({breadcrumbs: val}))
  }
}))
 
