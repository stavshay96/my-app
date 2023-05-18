import { useState } from "react";
import { DataGrid,  GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from "@material-ui/data-grid";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import PropTypes from 'prop-types';
//import {DataGrid,  GridToolbar, GridToolbarContainer, GridToolbarFilterButton} from '@mui/x-data-grid';

import Button from 'react-bootstrap/Button';
//import Box from '@mui/material/Box';
//import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import "./PlayersList.css";
import players from "./Players.jsx";

const columns = [
  { field: "points", headerName: "נקודות", headerAlign: 'right', type: "number", width: 93, filterable: true, align: 'center' },
  { field: "price", headerName: "מחיר", headerAlign: 'right', type: "number", width: 90, filterable: true, align: 'center' },
  { field: "playerName", headerName: "שם שחקן", headerAlign: 'right', width: 130, filterable: true, 
  align: 'center',   renderCell: wrapCellPlayerNameText , renderHeader: wrapHeaderText },
  {field: "position", headerName: "עמדה", headerAlign: 'center', width: 70, filterable: true, align: 'center', renderCell: wrapCellPositionColor,
  renderHeader: wrapPositionHeader },
];


const positions = ['הכל','שוער' ,'הגנה', 'קישור', 'התקפה'];

//init rows - move player arr to another file
const rows = players.map(createRow);
function createRow(player){
  return {id: player.id, points: player.points, price: player.price, playerName: `${player.playerName} (${player.team})`, position: player.position}
}

//not working yet
function wrapCellPositionColor(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'0.9vw', fontWeight: 'bold', }}>
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

function wrapPositionHeader(params) {
  return (
      <div style={{ fontSize: '0.001vw' ,whiteSpace: 'normal',lineHeight:'1.5' }}>
          {params.colDef.headerName}
      </div>
  );
}


//used for removing selection all in chcekBox col
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
      display: "none"
    }
  }
}));

function PlayersList(props) {
   const [selectedRows, setSelectedRows] = useState([]);
   const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [filterModel, setFilterModel] = useState({items: [],});

  const classes = useStyles();
/*  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection.selectionModel);
  };*/

  const handleFilterChange = (model) => {
    setFilterModel(model);
  };

  const handleClearFilters = () => {
    setFilterModel({ items: [] });
  };

  /*const handleCheckBox = (arrSelected) =>{
   //alert(`${arrSelected}`)
   setSelectedRows(arrSelected);
   setSelectedPlayers([]);
  
   //if(selectionModel.length <= 3){ alert(`${selectionModel}`)}
 // else {alert("lineup is full")}

 //  setSelectedRows(selectionModel);
 arrSelected.forEach((rowId) => {
    const rowFound = players.find((row) => row.id === rowId);
    setSelectedPlayers(prevArray => [...prevArray, rowFound]);
    
    
    
  //  alert(`${rowFound.playerName}`);
  });
  props.onCheckBoxChange(selectedPlayers);
  } */

  const handleCheckBox = (arrSelected) => {
    setSelectedRows(arrSelected);
  
    const selectedPlayers = arrSelected.map((rowId) => {
      return players.find((row) => row.id === rowId);
    });
  
    props.onCheckBoxChange(selectedPlayers);
  };



  function CustomToolbar({ setFilterButtonEl }) {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton ref={setFilterButtonEl} />
      </GridToolbarContainer>
    );
  }
  
  CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
  };
  
  const [filterButtonEl, setFilterButtonEl] = useState(null);


  const [sortModel, setSortModel] = useState([
    {
      field: 'price',
      sort: 'asc',
    },
  ]);

  
  return (
    <div>
      <DataGrid className={classes.root} style={{position:'fixed', top:'40%', right:'66.85%',
        width:'30.75%', height: '57%', backgroundColor: '#e0f9d5',     }}
       // filterModel={filterModel}
       // onFilterModelChange={handleFilterChange}
        rows={rows}
        columns={columns}
        disableColumnMenu
        checkboxSelection
        disableSelectionOnClick
        hideFooter
        selectionModel={selectedRows}
        onSelectionModelChange={handleCheckBox}

        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}

        components={{
          Toolbar: CustomToolbar,
        }}
        slotProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
        
       // onRowClick={handleCheckBox}
       // onRowSelectionModelChange={handleCheckBox}
      //  filterMode="header"
      //  onSelectionModelChange={handleSelectionModelChange}
       // selectionModel={selectionModel}
       /* initialState={{
          filter: {
            filterModel: {
              items: [
                { field: 'points', operator: '>', value: '0' },
                { field: 'price', operator: '>', value: '0' },
                { field: 'price', operator: '<', value: '16' },

            
            ],
            },
          },
        }}*/
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