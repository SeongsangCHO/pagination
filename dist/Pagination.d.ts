import React from "react";
interface IStyle {
    buttonBgColor?: string;
    numberColor?: string;
    customLeftArrowIcon?: React.ReactElement | string;
    customLeftArrowsIcon?: React.ReactElement | string;
    customRightArrowIcon?: React.ReactElement | string;
    customRightArrowsIcon?: React.ReactElement | string;
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
declare const Pagination: ({ totalPageCount, currPageNum, handlePageClick, data, customStyle, maxWidth, margin, fontSize, }: IProps) => JSX.Element;
export default Pagination;
