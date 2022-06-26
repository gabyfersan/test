import React, { useState, useEffect } from "react";
import { getResturantServive } from "./services";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  {
    field: "logo",
    headerName: "Logo",
    width: 70,
    renderCell: ((cellValues) => {
      return if(cellValues) {<img src={`${cellValues.row.logo}`}></img> } else {""};
    })(),
  },
  { field: "name", headerName: "Name", width: 130 },
  { field: "type", headerName: "Type", width: 130 },
  {
    field: "description",
    headerName: "Description",
    width: 90,
  },
];

const Home = () => {
  const [resturants, setresturants] = useState(null);
  useEffect(() => {
    const getResturants = async () => {
      const response = await getResturantServive();
      const responseJson = await response.json();
      setresturants(responseJson);
      console.log(responseJson);
    };
    getResturants();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <img src="https://loremflickr.com/500/500/restaurant"></img>
      {resturants && (
        <DataGrid
          rows={resturants}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default Home;
