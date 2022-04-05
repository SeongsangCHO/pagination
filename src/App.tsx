import React from "react";
import Pagination from "./components/Pagination";
import usePagination from "./hooks/usePagination";

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const {
    handlePageClick,
    totalPageCount,
    currPageNum,
    itemOffset,
    displayData,
  } = usePagination({
    data: DATA,
    itemPerPage: 3,
    delay: 1200,
    responsiveOption: {
      breakPoint: 768,
      delay: 200,
      breakPointUnderViewCount: 6,
      breakPointOverViewCount: 10,
    },
  });
  // console.log(displayData, totalPageCount, itemOffset);
  return (
    <div className="App">
      {displayData.map((item: any) => (
        <div key={item}>{item}</div>
      ))}
      <Pagination {...{ totalPageCount, currPageNum, handlePageClick }} />
    </div>
  );
}

export default App;
