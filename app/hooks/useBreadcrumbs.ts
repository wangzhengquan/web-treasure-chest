'use client';

import { useStore } from '@/app/store';
import { useEffect } from 'react';
import { Breadcrumb } from '../lib/definitions';
const useBreadcrumbs = (breadcrumbs : string | Breadcrumb | Breadcrumb[]) => {
  const setBreadcrumbs = useStore((state) => state.setBreadcrumbs);
  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
};

export default useBreadcrumbs;