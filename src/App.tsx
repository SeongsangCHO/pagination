import React, { useState } from "react";
import Pagination from "./components/Pagination";
import usePagination from "./hooks/usePagination";
import styled from "styled-components";

const DATA = Array(20)
  .fill({})
  .map((_, index) => ({
    id: index,
    name: `SECHO-${index}`,
  }));

function App() {
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
      <Grid>
        {displayData.map((item: any, _: number) => (
          <Card key={item.id}>
            <span>{item.name}</span>
            <button onClick={handleDelete} data-id={item.id}>
              X
            </button>
          </Card>
        ))}
      </Grid>
      <Pagination {...{ totalPageCount, currPageNum, handlePageClick, data }} />
    </div>
  );
}

export default App;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid gray;
  padding: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 1rem;
`;
