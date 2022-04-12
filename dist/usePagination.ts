import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

interface IProps {
  data: Array<any>;
  delay?: number;
  resize: boolean;

  responsiveOption?: {
    breakPoint: number;
    delay: number;
    breakPointUnderViewCount: number;
    breakPointOverViewCount: number;
  };
}
const usePagination = ({
  delay = 0,
  data = [],
  resize = false,
  responsiveOption = {
    breakPoint: 768,
    delay: 200,
    breakPointUnderViewCount: 6,
    breakPointOverViewCount: 10,
  },
}: IProps) => {
  const [itemCountPerPage, setItemCountPerPage] = useState(0);
  const [currPageNum, setCurrPageNum] = useState<number>(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [displayData, setDisplayData] = useState<Array<any>>([]);

  useEffect(() => {
    if (data.length !== 0 && itemCountPerPage !== 0) {
      setTotalPageCount(Math.ceil(data.length / itemCountPerPage));
    } else setTotalPageCount(1);
  }, [data, itemCountPerPage]);

  useEffect(() => {
    const endOffset = itemOffset + itemCountPerPage;
    setDisplayData(data.slice(itemOffset, endOffset));
  }, [itemOffset, itemCountPerPage, data]);

  useEffect(() => {
    if (currPageNum > totalPageCount && currPageNum !== 1) {
      setCurrPageNum(totalPageCount);
      setItemOffset((totalPageCount - 1) * itemCountPerPage);
    }
  }, [itemCountPerPage, totalPageCount, currPageNum]);

  const debounceSetItemOffset = debounce((newOffset: number) => {
    setItemOffset(newOffset);
  }, delay);

  const handlePageClick = (page: number) => {
    const newOffset = (page - 1) * itemCountPerPage;
    setCurrPageNum(page);
    debounceSetItemOffset(newOffset);
  };

  const handleResize = debounce(() => {
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
  }, 200);

  useEffect(() => {
    if (resize) {
      if (window.innerWidth > responsiveOption.breakPoint) {
        setItemCountPerPage(responsiveOption.breakPointOverViewCount);
      }
      if (window.innerWidth < responsiveOption.breakPoint) {
        setItemCountPerPage(responsiveOption.breakPointUnderViewCount);
      }
      window.addEventListener("resize", handleResize as any);
    }
    return () => {
      window.removeEventListener("resize", handleResize as any);
    };
  }, [handleResize, responsiveOption, resize]);
  return {
    handlePageClick,
    totalPageCount,
    currPageNum,
    itemOffset,
    displayData,
  };
};

export default usePagination;
