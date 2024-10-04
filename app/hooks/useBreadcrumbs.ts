'use client';

import { useStore } from '@/app/store';
import { useLayoutEffect } from 'react';
import { Breadcrumb } from '../lib/definitions';
const useBreadcrumbs = (breadcrumbs : string | Breadcrumb | Breadcrumb[]) => {
  const setBreadcrumbs = useStore((state) => state.setBreadcrumbs);
  useLayoutEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
};

export default useBreadcrumbs;