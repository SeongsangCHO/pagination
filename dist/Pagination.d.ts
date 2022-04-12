import React from "react";
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
declare const Pagination: ({ totalPageCount, currPageNum, handlePageClick, data, customStyle, maxWidth, margin, fontSize, }: IProps) => JSX.Element;
export default Pagination;
