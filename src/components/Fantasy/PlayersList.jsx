import { useState , useEffect} from "react";
import { DataGrid,  GridToolbar, GridToolbarContainer, GridToolbarFilterButton } from "@material-ui/data-grid";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import PropTypes from 'prop-types';

//For dropdown:
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from 'react-bootstrap/Button';
//import Box from '@mui/material/Box';
//import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import "./PlayersList.css";
import players from "./Players.jsx";

const columns = [
  { field: "points", headerName: "'נק", headerAlign: 'right', type: "number", flex: 1, filterable: true, align: 'center' },
  { field: "price", headerName: "מחיר", headerAlign: 'right', type: "number", flex: 1.1, filterable: true, align: 'center' },
  { field: "playerName", headerName: "שם שחקן", headerAlign: 'right', flex: 1.3, filterable: true, 
  align: 'center',   renderCell: wrapCellPlayerNameText , renderHeader: wrapHeaderText },
  {field: "position", headerName: "עמדה", headerAlign: 'center', flex: 0.75, filterable: true, align: 'center', renderCell: wrapCellPositionColor,
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

  useEffect(() => {
    const initialSelectedRows =[6, 7, 8, 9];
    setSelectedRows(initialSelectedRows);
    handleCheckBox(initialSelectedRows);
  }, []);
  
  const classes = useStyles();

  // probably related to filters - not used yet
  const handleFilterChange = (model) => {
    setFilterModel(model);
  };
 // probably related to filters - not used yet
  const handleClearFilters = () => {
    setFilterModel({ items: [] });
  };



 const cancelPickingSelectedRow = (arrSelected) => {
    arrSelected.forEach((item,index) => {
      if(item !== selectedRows[index]){
        arrSelected.splice(index, 1);
      }

    });
    return arrSelected;
  }

 const convertIDArrToPlayersArr = (arrSelected) =>{
  const selectedPlayers = arrSelected.map((rowId) => {
    return players.find((row) => row.id === rowId);
  });
  return selectedPlayers;
 }

 const isOverBudget = (arrSelected) =>{
  const newSelectedPlayers = convertIDArrToPlayersArr(arrSelected);
  let totalBudget = newSelectedPlayers.reduce((sum, item) => sum + item.price, 0); 
  return totalBudget > 100 ? true:false;
 }

 const isMaxPlayerInPosition =(arrSelected) =>{
    const newSelectedPlayers = convertIDArrToPlayersArr(arrSelected);
    const goalkeepers = newSelectedPlayers.filter((player) => player.position === 'GK');
    if(goalkeepers.length>1)
    {
      
    }
 }
///----------------------------------------------------------
 //arrSelected - the updated IDs array
 //selectedRows - the ID array before the last click on some checkbox
 //selectedPlayers - object array of players  before the last click on some checkbox
 //newSelectedPlayers - the updated players (objects) array
///----------------------------------------------------------
  const handleCheckBox = (arrSelected) => {
    
    if(arrSelected.length > 11)
     { 
      arrSelected = cancelPickingSelectedRow(arrSelected);
      alert("ההרכב מלא");
      console.log("ההרכב מלא");
     }

    
     if(isOverBudget(arrSelected))
     {
      arrSelected = cancelPickingSelectedRow(arrSelected, selectedRows);
      alert("חריגה מהתקציב");
      console.log("חריגה מהתקציב");
     }
     setSelectedRows(arrSelected);
     const newSelectedPlayers = convertIDArrToPlayersArr(arrSelected);
     setSelectedPlayers(newSelectedPlayers);  // Store the selected players in the state
     props.onCheckBoxChange(newSelectedPlayers);

     console.log(`${newSelectedPlayers.length} selectedPlayers`);
     console.log(`${selectedRows.length} selectedRows`);
     console.log(`${arrSelected.length} arrSelected`);
      
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
      sort: 'desc',
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