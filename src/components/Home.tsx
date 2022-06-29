import React, { useState, useEffect } from "react";
import { getResturantServive } from "./services";
import {
  DataGrid,
  useGridApiRef,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { BasicModal } from "./BasicModal.tsx";

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

    renderCell: (cellValues) => {
      return (
        <div
          style={{
            display: "block",
            textOverflow: "ellipsis",
            wordBreak: "break-all",
            overflow: "hidden",
            maxHeight: "3.6em",
            lineHeight: "1.8em;ht",
          }}
        >
          {cellValues.value}
        </div>
      );
    },

    flex: 5,
  },
];

const Home = () => {
  const [resturants, setresturants] = useState(null);
  //const [resturantAll, setresturantAll] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  //const apiRef = useGridApiRef();
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
          console.log("url", s.url);
          // aa.push({ id: rowIds[i], logo: s.url });
        }
        setresturants([...resturants]);
        //console.log(JSON.stringify(resturants, null, 4));
      }
    };
    a();
  }, [nextPage, resturants]);

  const onCloseModal = () => setIsModalOpen(false);
  const desending = (a, b) => {
    if (a > b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };
  const ascending = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      {resturants && (
        <DataGrid
          // onPageChange={(model) => {
          //   console.log("onPageChange", model);
          //   //setresturants([...resturants]);
          // }}
          // onStateChange={(model) => {
          //   console.log("onStateChange",model);
          //   //setresturants([...resturants]);
          // }}
          onSortModelChange={(model) => {
            if (model.length > 0) {
              //console.log(model);
              const field = model[0].field;
              let resturantsSorted = [...resturants];
              resturantsSorted.sort((rowa, rowb) => {
                //console.log(rowa[field]);
                return model[0].sort === "asc"
                  ? ascending(rowa[field], rowb[field])
                  : desending(rowa[field], rowb[field]);
              });
              setresturants(resturantsSorted);
            }
          }}
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
          onRowClick={(rowData) => {
            setRowData(rowData);
            setIsModalOpen(true);
          }}
        />
      )}
      <BasicModal
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        rowData={rowData}
      />
    </div>
  );
};

export default Home;
