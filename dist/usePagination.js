"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var usePagination = function (_a) {
    var _b = _a.delay, delay = _b === void 0 ? 0 : _b, _c = _a.data, data = _c === void 0 ? [] : _c, _d = _a.resize, resize = _d === void 0 ? false : _d, _e = _a.responsiveOption, responsiveOption = _e === void 0 ? {
        breakPoint: 768,
        delay: 200,
        breakPointUnderViewCount: 6,
        breakPointOverViewCount: 10,
    } : _e;
    var _f = (0, react_1.useState)(0), itemCountPerPage = _f[0], setItemCountPerPage = _f[1];
    var _g = (0, react_1.useState)(1), currPageNum = _g[0], setCurrPageNum = _g[1];
    var _h = (0, react_1.useState)(0), itemOffset = _h[0], setItemOffset = _h[1];
    var _j = (0, react_1.useState)(0), totalPageCount = _j[0], setTotalPageCount = _j[1];
    var _k = (0, react_1.useState)([]), displayData = _k[0], setDisplayData = _k[1];
    (0, react_1.useEffect)(function () {
        if (data.length !== 0 && itemCountPerPage !== 0) {
            setTotalPageCount(Math.ceil(data.length / itemCountPerPage));
        }
        else
            setTotalPageCount(1);
    }, [data, itemCountPerPage]);
    (0, react_1.useEffect)(function () {
        var endOffset = itemOffset + itemCountPerPage;
        setDisplayData(data.slice(itemOffset, endOffset));
    }, [itemOffset, itemCountPerPage, data]);
    (0, react_1.useEffect)(function () {
        if (currPageNum > totalPageCount && currPageNum !== 1) {
            setCurrPageNum(totalPageCount);
            setItemOffset((totalPageCount - 1) * itemCountPerPage);
        }
    }, [itemCountPerPage, totalPageCount, currPageNum]);
    var debounceSetItemOffset = (0, lodash_debounce_1.default)(function (newOffset) {
        setItemOffset(newOffset);
    }, delay);
    var handlePageClick = function (page) {
        var newOffset = (page - 1) * itemCountPerPage;
        setCurrPageNum(page);
        debounceSetItemOffset(newOffset);
    };
    var handleResize = (0, lodash_debounce_1.default)(function () {
        if (window !== undefined) {
            if (window.innerWidth > responsiveOption.breakPoint) {
                setItemCountPerPage(responsiveOption.breakPointOverViewCount);
                if (currPageNum <= totalPageCount) {
                    setItemOffset((currPageNum - 1) * responsiveOption.breakPointOverViewCount);
                }
            }
            if (window.innerWidth < responsiveOption.breakPoint) {
                setItemCountPerPage(responsiveOption.breakPointUnderViewCount);
                if (currPageNum <= totalPageCount) {
                    setItemOffset((currPageNum - 1) * responsiveOption.breakPointUnderViewCount);
                }
            }
        }
    }, 200);
    (0, react_1.useEffect)(function () {
        if (resize) {
            if (window.innerWidth > responsiveOption.breakPoint) {
                setItemCountPerPage(responsiveOption.breakPointOverViewCount);
            }
            if (window.innerWidth < responsiveOption.breakPoint) {
                setItemCountPerPage(responsiveOption.breakPointUnderViewCount);
            }
            window.addEventListener("resize", handleResize);
        }
        return function () {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize, responsiveOption, resize]);
    return {
        handlePageClick: handlePageClick,
        totalPageCount: totalPageCount,
        currPageNum: currPageNum,
        itemOffset: itemOffset,
        displayData: displayData,
    };
};
exports.default = usePagination;
