import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
  //전체 페이지 갯수
  totalPageCount: number;
  //현재 페이지
  currPageNum: number;
  handlePageClick: any;
  //
}

const DISPLAY_PAGE_BLOCK_COUNT = 5;

const Pagination = ({
  totalPageCount,
  currPageNum,
  handlePageClick,
}: IProps) => {
  const [paginationButtonList, setPaginationButtonList] = useState([]);
  const displayPageBlock = Array(totalPageCount)
    .fill(0)
    .map((_, idx) => idx + 1);

  const updateButtonList: any = () => {
    const left = totalPageCount - currPageNum;

    if (totalPageCount <= DISPLAY_PAGE_BLOCK_COUNT)
      return displayPageBlock.slice(0, totalPageCount);

    if (currPageNum < 4) {
      return displayPageBlock.slice(0, DISPLAY_PAGE_BLOCK_COUNT);
    } else {
      if (left <= 2) {
        return displayPageBlock.slice(
          totalPageCount - DISPLAY_PAGE_BLOCK_COUNT,
          totalPageCount
        );
      } else {
        return displayPageBlock.slice(currPageNum - 3, currPageNum + 2);
      }
    }
  };
  useEffect(() => {
    setPaginationButtonList(updateButtonList(displayPageBlock));
  }, [totalPageCount, currPageNum]);

  const handleClickPage = (e: MouseEvent) => {
    const { page } = (e.target as HTMLButtonElement).dataset;
    handlePageClick(Number(page));
  };
  return (
    <List>
      <li>
        <button disabled={currPageNum === 1} onClick={() => handlePageClick(1)}>
          {"<<"}
        </button>
        <button
          disabled={currPageNum === 1}
          onClick={() => handlePageClick(currPageNum - 1)}
        >
          {"<"}
        </button>
      </li>
      <li>
        {paginationButtonList.map((page: number, idx: number) => (
          <button
            key={idx}
            onClick={(e: any) => handleClickPage(e)}
            data-page={page}
            // disabled={page === currPageNum}
            // focused={page === currPageNum}
          >
            {page}
          </button>
        ))}
      </li>
      <li>
        <button
          disabled={currPageNum === totalPageCount}
          onClick={() => handlePageClick(currPageNum + 1)}
        >
          {">"}
        </button>
        <button
          disabled={currPageNum === totalPageCount}
          onClick={() => handlePageClick(totalPageCount)}
        >
          {">>"}
        </button>
      </li>
    </List>
  );
};

export default Pagination;

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 50%;
  margin: 0 auto;
  /* margin-bottom: 10px; */
  white-space: nowrap;
  gap: 5px;
  & li:nth-child(2) button {
    /* margin-left: 10px; */
  }
`;

const PageItem = styled.button`
  border-radius: 8px;
  /* background-color: ${({ theme }) => theme.colors.blue0}; */
`;
