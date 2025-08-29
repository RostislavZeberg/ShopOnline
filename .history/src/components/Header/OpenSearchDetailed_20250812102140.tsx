"use client"
import { useSelector } from 'react-redux';

import { SearchProductDetailed } from '@/modal/SearchProductDetailed';
import { RootState } from '@/store/store';

export const OpenSearchDetailed = () => {
  const isOpenSearchDetailed = useSelector((state: RootState) => state.burger.isOpenSearchDetailed);

  return (
    <>
      {isOpenSearchDetailed && <SearchProductDetailed />}
    </>
  )
}