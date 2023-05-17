import { useState } from "react";
import { DataGrid,  GridToolbar } from "@material-ui/data-grid";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
  {field: "position", headerName: " ", headerAlign: 'center', width: 70, filterable: true, align: 'center', renderCell: wrapCellPositionColor,
 },
];


const positions = ['הכל','שוער' ,'הגנה', 'קישור', 'התקפה'];

//init rows - move player arr to another file
const rows = players.map(createRow);
function createRow(player){
  return {id: player.id, points: player.points, price: `${player.price}m`, playerName: `${player.playerName} (${player.team})`, position: player.position}
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

//try to use dropdown - still not working
function CreatePositionDropdown(position){
  return(
    <Dropdown.Item style={{color:'black', textDecoration:'none', borderRadius: '0.5vw',border:'0.15vw solid #131313'
      ,backgroundColor:'#f3faf6', fontSize:'1.3vw'}} key={position}>
      {position}
      </Dropdown.Item>
  )
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

  const handleCheckBox = (arrSelected) =>{
   //alert(`${arrSelected}`)
   setSelectedRows(arrSelected);
   setSelectedPlayers([]);
  
   //if(selectionModel.length <= 3){ alert(`${selectionModel}`)}
 // else {alert("lineup is full")}

 //  setSelectedRows(selectionModel);
 arrSelected.forEach((rowId) => {
    const rowFound = rows.find((row) => row.id === rowId);
    setSelectedPlayers(prevArray => [...prevArray, rowFound]);
    
    
    
  //  alert(`${rowFound.playerName}`);
  });
  props.onCheckBoxChange(selectedPlayers);
 
    
    
  }

  
  return (
    <div>
        <DropdownButton className="btnDropdownPos float-end" title={ <> &#9650; עמדה</>} 
          style={{position:'fixed', top:'33%', right:'68.5%', }}  drop='up' >
           
            <div className= 'dropdown-menu '>
            {positions.map(CreatePositionDropdown)}
            </div>
            
    
        </DropdownButton>
      
      <DataGrid className={classes.root} style={{position:'fixed', top:'40%', right:'67.5%',
        width:'30%', height: '57%', backgroundColor: '#e0f9d5',     }}
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