import { useState , useEffect} from "react";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@material-ui/data-grid";

import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import "./css/PlayersList.css";
//import players from "./data/Players.jsx";
//import Arsenal from "../../images/kits/Arsenal.png";


const positions = ['הכל','שוער' ,'הגנה', 'קישור', 'התקפה'];


const columns = [
  { field: "totalPoints", headerName: "'נק", headerAlign: 'right', type: "number", flex: 1, filterable: true, align: 'center', renderCell: wrapNumberTypeText, renderHeader: wrapHeaderText },
  { field: "price", headerName: "מחיר", headerAlign: 'right', type: "number", flex: 1.1, filterable: true, align: 'center', renderCell: wrapNumberTypeText, renderHeader: wrapHeaderText },
  { field: "playerName", headerName: "שם שחקן", headerAlign: 'right', flex: 1.3, filterable: true, 
  align: 'center',   renderCell: wrapCellPlayerNameText , renderHeader: wrapHeaderText },
  {field: "position", headerName: "עמדה", headerAlign: 'center', flex: 0.75, filterable: true, align: 'center', renderCell: wrapCellPositionColor,
  renderHeader: wrapPositionHeader },
];

function createRow(player){

  return {id: player.id, totalPoints: player.totalPoints, currentPoints: player.currentPoints, 
    price: player.price, playerName: `${player.playerHebName} (${player.team})`, position: player.position, kit: player.kit}
}

function wrapHeaderText(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.5vw' }}>
          {params.colDef.headerName}
      </div>
  );
}

function wrapPositionHeader(params) {
  return (
      <div style={{ fontSize: '0.001vw', whiteSpace: 'normal', lineHeight:'1.5vw' }}>
          {params.colDef.headerName}
      </div>
  );
}

function wrapNumberTypeText(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'0.9vw'}}>
          {params.value}
      </div>
  );
}

//not working yet
function wrapCellPositionColor(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.5vw', fontSize:'0.9vw', fontWeight: 'bold', }}>
          {params.value}
      </div>
  );
}

function wrapCellPlayerNameText(params) {
  return (
      <div style={{ whiteSpace: 'normal', lineHeight:'1.2vw', fontSize:'0.9vw', fontWeight: 'bold',}}>
          {params.value}
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
 const players = props.playersList;
const rows = props.playersList.map(createRow);
 //const rows = players.map(createRow);
  //console.log(`rows got ${rows.length}`);
  //console.log(rows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [filterModel, setFilterModel] = useState({items: [],});

  useEffect(() => {
    //const initialSelectedRows =[1,9,10];
    setSelectedRows(props.initialSelectedRows);
    handleCheckBox(props.initialSelectedRows);
  }, [props.initialSelectedRows]);
  
  const classes = useStyles();

  // probably related to filters - not used yet
  const handleFilterChange = (model) => {
    setFilterModel(model);
  };

 // probably related to filters - not used yet
  const handleClearFilters = () => {
    setFilterModel({ items: [] });
  };

  const removeCaptainIfNeeded =(updatedIDArray) =>{
    selectedRows.forEach((item) => {
      console.log(props.captain);
      //if player was in the previous lineup and not in the updated array - he is the unselected. cheking as well he is the captain of the user
      if(!updatedIDArray.includes(item) && props.captain  /*&& item === props.captain.id*/) { 
        if (item === props.captain.id) {
          props.handleCaptain(undefined);
        }
      }
    });
  }

//check which player selected and the splice removing him from the updatedIDarray
 const cancelPickingSelectedRow = (updatedIDArray) => {
    updatedIDArray.forEach((item,index) => {
      if(item !== selectedRows[index]){
        updatedIDArray.splice(index, 1);
      }

    });
    return updatedIDArray;
  }

 const convertIDArrToPlayersArr = (updatedIDArray) =>{
    const selectedPlayers = updatedIDArray.map((rowId) => {
      return players.find((row) => row.id === rowId);
    });
    return selectedPlayers;
 }

 const isOverBudget = (updatedIDArray) =>{
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    let totalBudget = newSelectedPlayers.reduce((sum, item) => sum + item.price, 0); 
    return totalBudget > props.budgetLimit ? true:false;
 }

 const isOverPlayersFromSameTeam = (updatedIDArray) => {
   const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
   const teamCounts = {};  // Create an object to store the count of players for each team
   // Iterate through the players and count the number of players for each team
   newSelectedPlayers.forEach(player => {
       const team = player.kit; 
       teamCounts[team] = (teamCounts[team] || 0) + 1;
   });
   console.log(teamCounts);
   // Check if any kit has more than the allowed limit
   const isOverLimit = Object.values(teamCounts).some(count => count > props.playersFromSameTeamLimit);
   return isOverLimit;

 }

 const isMaxGoalkeepers = (updatedIDArray) =>{
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const goalkeepers = newSelectedPlayers.filter((player) => player.position === "GK");
    return goalkeepers.length > 1 ? true:false;
 }

 const isMaxDefenders = (updatedIDArray) =>{
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const defenders = newSelectedPlayers.filter((player) => player.position === 'DF');
    return defenders.length > 5 ? true:false;
 }

 const isMaxMidfielders = (updatedIDArray) =>{
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const midfielders = newSelectedPlayers.filter((player) => player.position === 'MF');
    return midfielders.length > 5 ? true:false;
 }

 const isMaxForwards = (updatedIDArray) =>{
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const forwards = newSelectedPlayers.filter((player) => player.position === 'FW');
    return forwards.length > 3 ? true:false;
 }

  ///----------------------------------------------------------
  //selectedRows - the ID array before the last click on some checkbox
  //selectedPlayers - object array of players  before the last click on some checkbox
  //newSelectedPlayers - the updated players (objects) array
  ///----------------------------------------------------------

  const handleCheckBox = (updatedIDArray) => {
    
    if (updatedIDArray.length > 11)
    { 
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ההרכב מלא");
      console.log("ההרכב מלא");
    }

    if (isMaxGoalkeepers(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור שוער אחד בלבד!");
      console.log("ניתן לבחור שוער אחד בלבד!");
    }
    if (isMaxDefenders(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור עד 5 מגנים בלבד!");
      console.log("ניתן לבחור עד 5 מגנים בלבד!");
    }
    if (isMaxMidfielders(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור עד חמישה קשרים בלבד!");
      console.log("ניתן לבחור עד חמישה קשרים בלבד!");
    }
    if (isMaxForwards(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור עד 3 חלוצים בלבד!");
      console.log("ניתן לבחור עד 3 חלוצים בלבד!");
    }
    if(isOverBudget(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray, selectedRows);
      alert("חריגה מהתקציב");
      console.log("חריגה מהתקציב");
    }
   /* if(isOverSubs(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray, selectedRows);
      alert(" חריגה בכמות החילופים ");
      console.log("חריגה בכמות החילופים");
    }*/
    if(isOverPlayersFromSameTeam(updatedIDArray))
    {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray, selectedRows);
      alert(`חריגה בכמות השחקנים מאותה הקבוצה. מותר ${props.playersFromSameTeamLimit} בלבד `);
      console.log("חריגה בכמות השחקנים מאותה הקבוצה");
    }
    //if isOverSubs

    removeCaptainIfNeeded(updatedIDArray);

    setSelectedRows(updatedIDArray);
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    setSelectedPlayers(newSelectedPlayers);  // Store the selected players in the state
    props.onCheckBoxChange(newSelectedPlayers);

    console.log(`${newSelectedPlayers.length} selectedPlayers`);
    console.log(`${selectedRows.length} selectedRows`);
    console.log(`${updatedIDArray.length} updatedIDArray`);
    console.log(`${updatedIDArray} updatedIDArray`);
      
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
      <DataGrid className={classes.root} style={{position:'absolute', top:'39.75%', right:'66.95%', zindex:'1',
        width:'30.75%', height: '97%', backgroundColor: '#e0f9d5',  backgroundImage: `url(https://img.freepik.com/premium-photo/green-purple-abstract-watercolor-painting-textured-white-paper-background_7190-1251.jpg?w=740)`  }}
       // filterModel={filterModel}
       // onFilterModelChange={handleFilterChange}
        rows={rows}
        columns={columns}
        disableColumnMenu
        checkboxSelection
        disableSelectionOnClick
        //hideFooter
       // hideFooterPagination
        selectionModel={selectedRows}
        onSelectionModelChange={handleCheckBox}
        pageSize={100}
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

export default PlayersList;