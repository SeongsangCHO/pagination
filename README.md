# react-responsive-pagination-component

---

![example](https://user-images.githubusercontent.com/55486644/162971856-15326070-22f0-4a7b-91c6-890c36f30881.gif)




## Usage

```tsx
import React, { useState } from "react";
import { Pagination, usePagination } from "react-responsive-pagination-hook";

function App() {
  const DATA = Array(20)
    .fill({})
    .map((_, index) => ({
      id: index,
      name: `SECHO-${index}`,
    }));
  const [data, setData] = useState([...DATA]);
  const { handlePageClick, totalPageCount, currPageNum, displayData } =
    usePagination({
      data: data,
      delay: 0,
      resize: true,
      responsiveOption: {
        breakPoint: 768,
        delay: 200,
        breakPointUnderViewCount: 6,
        breakPointOverViewCount: 10,
      },
    });
  const handleDelete = (e: any) => {
    const { id } = e.target.dataset;
    setData([...data.filter((item) => item.id != id)]);
  };
  return (
    <div className="App">
      <div>
        {displayData.map((item: any, _: number) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <button onClick={handleDelete} data-id={item.id}>
              X
            </button>
          </div>
        ))}
      </div>
      <Pagination {...{ totalPageCount, currPageNum, handlePageClick, data }} />
    </div>
  );
}
```







## Hook Props

---

| Parameter        | Description               | Type       | Default |
| ---------------- | ------------------------- | ---------- | ------- |
| data             | Total data                | array<any> | []      |
| resize           | set resize option         | boolean    | False   |
| delay            | Debounce delay for resize | Number     | 0       |
| responsiveOption | Object                    | array<any> | []      |



### responsiveOption Props

---

| Parameter                | Description                                                | Type       | Default |
| ------------------------ | ---------------------------------------------------------- | ---------- | ------- |
| breakPoint               | Responsive break point width px                            | array<any> | []      |
| breakPointUnderViewCount | Number of items displayed when less than the breakpoint    | Number     | 6       |
| breakPointOverViewCount  | Number of items displayed when greater than the breakpoint | Number     | 10      |







## Pagination Component Props

---

| Parameter       | Description          | Type                 | Default |
| --------------- | -------------------- | -------------------- | ------- |
| totalPageCount  | total page count     | number               | -       |
| currPageNum     | current page number  | number               | -       |
| handlePageClick | Page change callback | Function(pageNumber) |         |
| data            | Total data           | array<any>           | []      |
| customStyle     | Custom style props   | Object               |         |



#### Custom Style Props

---

| Parameter             | Description                    | Type                         | Default    |
| --------------------- | ------------------------------ | ---------------------------- | ---------- |
| buttonBgColor         | Pagination Background color    | String                       | "\#1590fe" |
| numberColor           | number color                   | String                       | "white"    |
| customLeftArrowIcon   | Arrow Icon                     | React.ReactElement \| string | "<"        |
| customLeftArrowsIcon  | Arrow Icon                     | React.ReactElement \| string | "<<"       |
| customRightArrowIcon  | Arrow Icon                     | React.ReactElement \| string |            |
| customRightArrowsIcon | Arrow Icon                     | React.ReactElement \| string | ">>"       |
| maxWidth              | pagination container max width | String                       | -          |
| margin                | pagination container margin    | String                       | -          |
| fontSize              | Font size                      | String                       | -          |