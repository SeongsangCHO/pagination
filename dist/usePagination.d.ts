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
declare const usePagination: ({ delay, data, resize, responsiveOption, }: IProps) => {
    handlePageClick: (page: number) => void;
    totalPageCount: number;
    currPageNum: number;
    itemOffset: number;
    displayData: any[];
};
export default usePagination;
