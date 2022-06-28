import React, { useState, useEffect } from "react";
import { getResturantServive } from "./services";
import {
  DataGrid,
  useGridApiRef,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";

const pageSize = 5;

const columns = [
  {
    field: "logoImg",
    headerName: "Logo",
    //width: 70,
    maxwidt: 50,

    renderCell: (cellValues) => {
      //return <img src="" />;
      return cellValues.value ? (
        <img src={`${cellValues.value}`} width="50px"></img>
      ) : (
        <span />
      );
    },
    //valueGetter: (params) => <img src={`${params.row.logo}`}></img>,

    //renderCell: async (cellValues) => {
    //console.log(JSON.stringify(cellValues));
    // if (cellValues) {
    // } else {
    //   ("");
    // }
    // return (() => (
    //   <img src={`${cellValues.getValue(cellValues.id, "logo")}`}></img>
    // ))();

    //.then(  (r) => r.json());
    //const s = await r.json();

    //  return (() => <img src={`${r.url}`}></img>)();

    //console.log("");

    //const r = await fetch(cellValues.getValue(cellValues.id, "logo"));
    //return <img src={`${r.url}`}></img>;
    //},
  },
  {
    field: "name",
    headerName: "Name", //width: 130
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type", //width: 130,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    //width: 90,
    flex: 5,
  },
];

const Home = () => {
  const [resturants, setresturants] = useState(null);
  //const [resturantAll, setresturantAll] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const apiRef = useGridApiRef();
  useEffect(() => {
    const getResturants = async () => {
      const response = await getResturantServive();
      const responseJson = await response.json();
      setresturants(responseJson);
      setNextPage(0);
      //await handleUpdateAllRows(responseJson, 0);
      //console.log(responseJson);
    };
    getResturants();
  }, []);

  useEffect(() => {
    const a = async () => {
      const nextIndex = nextPage * pageSize;
      if (resturants && !resturants?.[nextIndex].logoImg) {
        for (let i = nextIndex; i < (nextPage + 1) * pageSize; i++) {
          //console.log(resturants[i].logo);
          const s = await fetch(resturants[i].logo);
          resturants[i].logoImg = s.url;
          // aa.push({ id: rowIds[i], logo: s.url });
        }
        setresturants([...resturants]);
        //console.log(JSON.stringify(resturants, null, 4));
      }
    };
    a();
  }, [nextPage]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      {resturants && (
        <DataGrid
          //onPageChange={(newPage) => handleUpdateAllRows(resturants, newPage)}
          onPageChange={(newPage) => setNextPage(newPage)}
          //apiRef={apiRef}
          pageSize={pageSize}
          rows={resturants}
          columns={columns}
          rowsPerPageOptions={[pageSize]}
          //checkboxSelection
          pagination
          //rowsPerPageOptions={[]}
        />
      )}
    </div>
  );
};

export default Home;
