import React from "react";
import ReactDOM from "react-dom";
import Pagination from "./components/Pagination";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Pagination
    {...{
      totalPageCount: -9999,
      currPageNum: -9999,
      handlePageClick: () => {},
      data: [],
    }}
  />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
