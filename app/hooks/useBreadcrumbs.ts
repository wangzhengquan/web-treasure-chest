'use client';

import { useStore } from '@/app/store';
import { useLayoutEffect, useEffect } from 'react';
import { Breadcrumb } from '@app/types/definitions';
const useBreadcrumbs = (breadcrumbs : string | Breadcrumb | Breadcrumb[]) => {
  const setBreadcrumbs = useStore((state) => state.setBreadcrumbs);
  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
};

export default useBreadcrumbs;
