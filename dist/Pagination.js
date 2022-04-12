"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = __importStar(require("styled-components"));
var DISPLAY_PAGE_BLOCK_COUNT = 5;
var Pagination = function (_a) {
    var totalPageCount = _a.totalPageCount, currPageNum = _a.currPageNum, handlePageClick = _a.handlePageClick, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.customStyle, customStyle = _c === void 0 ? {
        buttonBgColor: "#1590fe",
        numberColor: "white",
        customLeftArrowIcon: "<",
        customLeftArrowsIcon: "<<",
        customRightArrowIcon: ">",
        customRightArrowsIcon: ">>",
    } : _c, maxWidth = _a.maxWidth, margin = _a.margin, fontSize = _a.fontSize;
    var _d = (0, react_1.useState)([]), paginationButtonList = _d[0], setPaginationButtonList = _d[1];
    var displayPageBlock = Array(totalPageCount)
        .fill(0)
        .map(function (_, idx) { return idx + 1; });
    var updateButtonList = function () {
        var left = totalPageCount - currPageNum;
        if (totalPageCount <= DISPLAY_PAGE_BLOCK_COUNT)
            return displayPageBlock.slice(0, totalPageCount);
        if (currPageNum < 4) {
            return displayPageBlock.slice(0, DISPLAY_PAGE_BLOCK_COUNT);
        }
        else {
            if (left <= 2) {
                return displayPageBlock.slice(totalPageCount - DISPLAY_PAGE_BLOCK_COUNT, totalPageCount);
            }
            else {
                return displayPageBlock.slice(currPageNum - 3, currPageNum + 2);
            }
        }
    };
    (0, react_1.useEffect)(function () {
        setPaginationButtonList(updateButtonList(displayPageBlock));
    }, [totalPageCount, currPageNum]);
    var handleClickPage = function (e) {
        var page = e.target.dataset.page;
        handlePageClick(Number(page));
    };
    if (data.length === 0) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
    return ((0, jsx_runtime_1.jsxs)(List, __assign({}, { maxWidth: maxWidth, margin: margin, fontSize: fontSize }, { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(PageItem, __assign({ disabled: currPageNum === 1, onClick: function () { return handlePageClick(1); } }, { children: customStyle.customLeftArrowsIcon })), (0, jsx_runtime_1.jsx)(PageItem, __assign({ disabled: currPageNum === 1, onClick: function () { return handlePageClick(currPageNum - 1); } }, { children: customStyle.customLeftArrowIcon }))] }), (0, jsx_runtime_1.jsx)("li", { children: paginationButtonList.map(function (page, idx) { return ((0, jsx_runtime_1.jsx)(PageItem, __assign({ onClick: function (e) { return handleClickPage(e); }, "data-page": page, focused: page === currPageNum, customStyle: customStyle }, { children: page }), idx)); }) }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(PageItem, __assign({ disabled: currPageNum === totalPageCount, onClick: function () { return handlePageClick(currPageNum + 1); } }, { children: customStyle.customRightArrowIcon })), (0, jsx_runtime_1.jsx)(PageItem, __assign({ disabled: currPageNum === totalPageCount, onClick: function () { return handlePageClick(totalPageCount); } }, { children: customStyle.customRightArrowsIcon }))] })] })));
};
exports.default = Pagination;
var List = styled_components_1.default.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  margin: ", ";\n  max-width: ", ";\n  font-size: ", ";\n  margin: 0 auto;\n  white-space: nowrap;\n  list-style: none;\n  & li {\n    display: flex;\n    align-items: center;\n  }\n"], ["\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  margin: ", ";\n  max-width: ", ";\n  font-size: ", ";\n  margin: 0 auto;\n  white-space: nowrap;\n  list-style: none;\n  & li {\n    display: flex;\n    align-items: center;\n  }\n"])), function (props) { return props.margin; }, function (props) { return props.maxWidth; }, function (props) { return props.fontSize; });
var PageItem = styled_components_1.default.button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  border-radius: 8px;\n  padding: 4px 6px;\n  border: none;\n  width: 28px;\n  height: 28px;\n  color: black;\n  background-color: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: 0.2s;\n  user-select: none;\n  & path {\n    fill: black;\n  }\n\n  &:hover {\n    background-color: ", ";\n    opacity: 0.7;\n    color: ", ";\n  }\n\n  ", "\n\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n    background-color: rgba(0, 0, 0, 0.25);\n  }\n"], ["\n  border-radius: 8px;\n  padding: 4px 6px;\n  border: none;\n  width: 28px;\n  height: 28px;\n  color: black;\n  background-color: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: 0.2s;\n  user-select: none;\n  & path {\n    fill: black;\n  }\n\n  &:hover {\n    background-color: ", ";\n    opacity: 0.7;\n    color: ", ";\n  }\n\n  ", "\n\n  &:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n    background-color: rgba(0, 0, 0, 0.25);\n  }\n"])), function (props) { var _a; return (_a = props.customStyle) === null || _a === void 0 ? void 0 : _a.buttonBgColor; }, function (props) { var _a; return (_a = props.customStyle) === null || _a === void 0 ? void 0 : _a.numberColor; }, function (_a) {
    var focused = _a.focused, customStyle = _a.customStyle;
    return focused && (0, styled_components_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      background-color: ", ";\n      color: ", ";\n      cursor: not-allowed;\n    "], ["\n      background-color: ", ";\n      color: ", ";\n      cursor: not-allowed;\n    "])), customStyle === null || customStyle === void 0 ? void 0 : customStyle.buttonBgColor, customStyle === null || customStyle === void 0 ? void 0 : customStyle.numberColor);
});
var templateObject_1, templateObject_2, templateObject_3;
