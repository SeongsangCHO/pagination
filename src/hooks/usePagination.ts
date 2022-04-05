import { useEffect, useRef, useState } from "react";

interface IProps {
  data: Array<any>;
  itemPerPage: number;
  delay: number;
  responsiveOption?: {
    breakPoint: number;
    delay: number;
    breakPointUnderViewCount: number;
    breakPointOverViewCount: number;
  };
}
const usePagination = ({
  itemPerPage,
  delay = 0,
  data = [],
  responsiveOption = {
    breakPoint: 768,
    delay: 200,
    breakPointUnderViewCount: 6,
    breakPointOverViewCount: 10,
  },
}: IProps) => {
  const [totalDataCount, setTotalDataCount] = useState(data.length);
  const [itemCountPerPage, setItemCountPerPage] = useState(0);
  const [currPageNum, setCurrPageNum] = useState<number>(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [displayData, setDisplayData] = useState<Array<any>>([]);

  const timeOutId = useRef<number>(-1);

  const handleResize = () => {
    if (window !== undefined) {
      if (window.innerWidth > responsiveOption.breakPoint) {
        setItemCountPerPage(responsiveOption.breakPointOverViewCount);
        if (currPageNum <= totalPageCount) {
          setItemOffset(
            (currPageNum - 1) * responsiveOption.breakPointOverViewCount
          );
        }
      }
      if (window.innerWidth < responsiveOption.breakPoint) {
        setItemCountPerPage(responsiveOption.breakPointUnderViewCount);
        if (currPageNum <= totalPageCount) {
          setItemOffset(
            (currPageNum - 1) * responsiveOption.breakPointUnderViewCount
          );
        }
      }
    }
  };

  useEffect(() => {
    if (totalDataCount !== 0 && itemPerPage !== 0) {
      setTotalPageCount(Math.ceil(totalDataCount / itemPerPage));
    } else setTotalPageCount(0);
  }, [totalDataCount]);

  const debounce = ({ cb, delay }: { cb: any; delay: number }) => {
    if (timeOutId.current !== -1) {
      clearTimeout(timeOutId.current);
    }
    timeOutId.current = setTimeout(cb, delay) as unknown as number;
  };

  const handlePageClick = (page: number) => {
    const newOffset = page - 1;
    setCurrPageNum(page);
    debounce({ cb: setItemOffset(newOffset), delay });
  };

  useEffect(() => {
    const endOffset = itemOffset + itemCountPerPage;
    setDisplayData(data.slice(itemOffset, endOffset));
  }, [itemOffset, itemCountPerPage, data]);

  return {
    handlePageClick,
    totalPageCount,
    currPageNum,
    itemOffset,
    displayData,
  };
};

export default usePagination;
