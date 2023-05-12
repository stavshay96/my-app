import { useState } from "react";
import { DataGrid, GridCheckboxHeader } from "@material-ui/data-grid";
//import Box from '@mui/material/Box';
//import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import "./PlayersList.css";

const columns = [
  { field: "points", headerName: "נקודות", headerAlign: 'right', type: "number", width: 93, filterable: false, align: 'center' },
  { field: "price", headerName: "מחיר", headerAlign: 'right', type: "number", width: 90, filterable: false, align: 'center' },
  { field: "playerName", headerName: "שם שחקן", headerAlign: 'right', width: 130, filterable: false, 
  align: 'center',   renderCell: wrapCellPlayerNameText , renderHeader: wrapHeaderText },
  {field: "position", headerName: " ", headerAlign: 'center', width: 70, filterable: false, align: 'center', renderCell: wrapCellPositionColor,
 },
];

const rows = [
  { id: 1, points: 64, price: 10, playerName: "ערן זהבי", position: 'FW' },
  { id: 2, points: 72, price: 10, playerName: "עומר אצילי", position: 'MF' },
  { id: 3, points: 34, price: 15, playerName: "כריסטיאנו רונאלדו", position: 'MF' },
  { id: 4, points: 15, price: 15, playerName: "ליונל מסי", position: 'MF' },
  { id: 5, points: 66, price: 15, playerName: "ארלינג האלנד", position: 'FW' },
  { id: 6, points: 12, price: 6, playerName: "דניאל פרץ", position: 'GK' },
  { id: 7, points: 44, price: 14, playerName: "קארים בנזמה", position: 'FW' },
  { id: 8, points: -18, price: 13, playerName: "בן ביטון", position: 'FW' },
  { id: 9, points: 25, price: 14, playerName: "ניימאר", position: 'FW' },
];

function wrapCellPositionColor(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'0.9vw', fontWeight: 'bold',}}>
          {params.value}
      </div>
  );
}

function wrapCellPlayerNameText(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'0.9vw', fontWeight: 'bold',}}>
          {params.value}
      </div>
  );
}

function wrapHeaderText(params) {
  return (
      <div style={{ whiteSpace: 'normal',lineHeight:'1.5' }}>
          {params.colDef.headerName}
      </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
      display: "none"
    }
  }
}));

function PlayersList() {
  const [selectionModel, setSelectionModel] = useState([]);
  const classes = useStyles();
  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection.selectionModel);
  };


  return (
    <div>
      
      <DataGrid className={classes.root} style={{position:'fixed', top:'40%', right:'67.5%',
        width:'30%', height: '57%', backgroundColor: '#e0f9d5',     }}
        rows={rows}
        columns={columns}
        disableColumnMenu
        checkboxSelection
        hideFooter
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel}
      />
     
    </div>
  );
}


/* cellClassName: (params) => {
    return clsx('super-app', {
      GK: params.value == 'GK',
      DF: params.value == 'DF',
      MF: params.value == 'MF',
      FW: params.value == 'FW'
    })

<Box sx={{
        '& .GK': {
          backgroundColor: '#d47483',
        }
      }}>

       </Box>
  } */

export default PlayersList;