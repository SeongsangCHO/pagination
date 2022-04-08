import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as LeftArrow } from "../assets/LeftArrow.svg";
import { ReactComponent as LeftArrows } from "../assets/LeftArrows.svg";
import { ReactComponent as RightArrows } from "../assets/RightArrows.svg";
import { ReactComponent as RightArrow } from "../assets/RightArrow.svg";

interface IStyle {
  buttonBgColor?: string;
  numberColor?: string;
  customLeftArrowIcon?: React.ReactElement;
  customLeftArrowsIcon?: React.ReactElement;
  customRightArrowIcon?: React.ReactElement;
  customRightArrowsIcon?: React.ReactElement;
  maxWidth?: string;
  margin?: string;
  fontSize?: string;
}

interface IProps extends IStyle {
  totalPageCount: number;
  currPageNum: number;
  handlePageClick: any;
  data: Array<any>;
  customStyle?: IStyle;
}

const DISPLAY_PAGE_BLOCK_COUNT = 5;

const Pagination = ({
  totalPageCount,
  currPageNum,
  handlePageClick,
  data = [],
  customStyle = {
    buttonBgColor: "#1590fe",
    numberColor: "white",
    customLeftArrowIcon: <LeftArrow />,
    customLeftArrowsIcon: <LeftArrows />,
    customRightArrowIcon: <RightArrow />,
    customRightArrowsIcon: <RightArrows />,
  },
  maxWidth,
  margin,
  fontSize,
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
  if (data.length === 0) {
    return <></>;
  }
  return (
    <List {...{ maxWidth, margin }}>
      <li>
        <PageItem
          disabled={currPageNum === 1}
          onClick={() => handlePageClick(1)}
        >
          {customStyle.customLeftArrowsIcon}
        </PageItem>
        <PageItem
          disabled={currPageNum === 1}
          onClick={() => handlePageClick(currPageNum - 1)}
        >
          {customStyle.customLeftArrowIcon}
        </PageItem>
      </li>
      <li>
        {paginationButtonList.map((page: number, idx: number) => (
          <PageItem
            key={idx}
            onClick={(e: any) => handleClickPage(e)}
            data-page={page}
            focused={page === currPageNum}
            customStyle={customStyle}
          >
            {page}
          </PageItem>
        ))}
      </li>
      <li>
        <PageItem
          disabled={currPageNum === totalPageCount}
          onClick={() => handlePageClick(currPageNum + 1)}
        >
          {customStyle.customRightArrowIcon}
        </PageItem>
        <PageItem
          disabled={currPageNum === totalPageCount}
          onClick={() => handlePageClick(totalPageCount)}
        >
          {customStyle.customRightArrowsIcon}
        </PageItem>
      </li>
    </List>
  );
};

export default Pagination;

const List = styled.ul<IStyle>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: ${(props) => props.margin};
  max-width: ${(props) => props.maxWidth};
  font-size: ${(props) => props.fontSize};
  margin: 0 auto;
  white-space: nowrap;
  list-style: none;
  & li {
    display: flex;
    align-items: center;
  }
`;

const PageItem = styled.button<{ focused?: boolean; customStyle?: IStyle }>`
  border-radius: 8px;
  padding: 4px 6px;
  border: none;
  width: 28px;
  height: 28px;
  color: black;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  user-select: none;
  & path {
    fill: black;
  }

  &:hover {
    background-color: ${(props) => props.customStyle?.buttonBgColor};
    opacity: 0.7;
    color: ${(props) => props.customStyle?.numberColor};
  }

  ${({ focused, customStyle }) =>
    focused &&
    css`
      background-color: ${customStyle?.buttonBgColor};
      color: ${customStyle?.numberColor};
      cursor: not-allowed;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;
