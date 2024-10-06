/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState , useEffect} from "react";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@material-ui/data-grid";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import "./css/PlayersList.css";

function createRow(player){
  return {id: player.id, totalPoints: player.totalPoints, currentPoints: player.currentPoints, 
    price: player.price, playerName: `${player.playerHebName} (${player.team})`, position: player.position, kit: player.kit}
}

function wrapHeaderText(params) {
  return (
      <div className="grid-header-cell">
          {params.colDef.headerName}
      </div>
  );
}

function wrapPositionHeader(params) {
  return (
      <div className="" style={{ fontSize: '0.001vw', whiteSpace: 'normal', lineHeight:'1.5vw' }}>
          {params.colDef.headerName}
      </div>
  );
}

function wrapNumberTypeText(params) {
  return (
      <div className="grid-cell-text">
          {params.value}
      </div>
  );
}

//not working yet
function wrapCellPositionColor(params) {
  return (
      <div className="grid-cell-position">
          {params.value}
      </div>
  );
}

function wrapCellPlayerNameText(params) {
  return (
      <div className="grid-cell-player-name">
          {params.value}
      </div>
  );
}

//used for removing selection all in chcekBox col
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
      display: "none"
    },
    "& .MuiDataGrid-toolbarContainer": {
      height:'60px',
    },
    "& .MuiDataGrid-cell": {
      whiteSpace: 'normal',
      overflow: 'visible',
      wordWrap: 'break-word',
      lineHeight: '1.5',
    },
    "& .MuiButton-root": {
      padding: '12px 24px',
      fontSize: '30px',

     [theme.breakpoints.up('lg')]: { // lg corresponds to >=1280px by default
      fontSize: '20px',
      },
    },
    "& .MuiSvgIcon-root": {
      width: '35px',
      height: '35px',

      [theme.breakpoints.up('lg')]: {
        width: '25px',
        height: '25px',
      },
    },
    "& .MuiDataGrid-footerContainer": {
      fontSize: "24px",
    },
    "& .MuiTablePagination-root": {
      fontSize: "24px",
    },
    "& .MuiIconButton-root svg": {
      width: '70px',
      height: '70px',

      [theme.breakpoints.up('lg')]: {
        width: '35px',
        height: '35px',
      },
    },
    "& .MuiTablePagination-caption": {
      display: 'none',
    },
  }
}));

function PlayersList(props) {
  const players = props.playersList;
  const rows = props.playersList.map(createRow);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const classes = useStyles();

  const [cols, setCols] = useState([
    { field: "totalPoints", headerName: "נקודות", headerAlign: 'right', type: "number",minWidth:50, flex: 1, filterable: true, align: 'center', renderCell: wrapNumberTypeText, renderHeader: wrapHeaderText },
    { field: "price", headerName: "מחיר", headerAlign: 'center', type: "number",minWidth:50, flex: 1, filterable: true, align: 'center', renderCell: wrapNumberTypeText, renderHeader: wrapHeaderText },
    { field: "playerName", headerName: " שם שחקן ", headerAlign: 'center', minWidth: 150, flex: 4, filterable: true, 
    align: 'center',   renderCell: wrapCellPlayerNameText , renderHeader: wrapHeaderText },
    {field: "position", headerName: "עמדה", headerAlign: 'center',minWidth:50, flex: 1, filterable: true, align: 'center', renderCell: wrapCellPositionColor,
    renderHeader: wrapPositionHeader },
  ]);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      const updatedCols = [...cols];
      const minWidthCol = 100;

      if (screenWidth >= 1800) {
        updatedCols[0].minWidth = updatedCols[1].minWidth = minWidthCol * 0.7;
        updatedCols[2].minWidth = minWidthCol * 2.8;
        updatedCols[3].minWidth = minWidthCol * 0.7;
      } else if (screenWidth >= 1200) {
        updatedCols[0].minWidth = updatedCols[1].minWidth = minWidthCol * 0.3;
        updatedCols[2].minWidth = minWidthCol * 2.5;
        updatedCols[3].minWidth = minWidthCol * 0.5;
      } else {
        // Apply default or mobile minWidth
        updatedCols[0].minWidth = updatedCols[1].minWidth = minWidthCol * 1.25;
        updatedCols[2].minWidth = minWidthCol * 5;
        updatedCols[3].minWidth = minWidthCol * 1.2;
      }

      setCols(updatedCols);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSelectedRows(props.initialSelectedRows);
    handleCheckBox(props.initialSelectedRows);
  }, [props.initialSelectedRows]);

  // probably related to filters - not used yet
  const handleFilterChange = (model) => {
    setFilterModel(model);
  };

  // probably related to filters - not used yet
  const handleClearFilters = () => {
    setFilterModel({ items: [] });
  };

  const removeCaptainIfNeeded = (updatedIDArray) => {
    selectedRows.forEach((item) => {
      console.log(props.captain);
      // if player was in the previous lineup and not in the updated array -
      // he is the unselected. checking as well he is the captain of the user

      if (
        !updatedIDArray.includes(item) &&
        props.captain /*&& item === props.captain.id*/
      ) {
        if (item === props.captain.id) {
          props.handleCaptain(undefined);
        }
      }
    });
  };

  // check which player selected and the splice removing him from the updatedIDarray
  const cancelPickingSelectedRow = (updatedIDArray) => {
    updatedIDArray.forEach((item, index) => {
      if (item !== selectedRows[index]) {
        updatedIDArray.splice(index, 1);
      }
    });

    return updatedIDArray;
  };

  const convertIDArrToPlayersArr = (updatedIDArray) => {
    const selectedPlayers = updatedIDArray.map((rowId) => {
      return players.find((row) => row.id === rowId);
    });

    return selectedPlayers;
  };

  const isOverBudget = (updatedIDArray) => {
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    let totalBudget = newSelectedPlayers.reduce(
      (sum, item) => sum + item.price, 0
    );

    return totalBudget > props.budgetLimit ? true : false;
  };

  const isOverPlayersFromSameTeam = (updatedIDArray) => {
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const teamCounts = {}; // Create an object to store the count of players for each team

    // Iterate through the players and count the number of players for each team
    newSelectedPlayers.forEach((player) => {
      const team = player.kit;
      teamCounts[team] = (teamCounts[team] || 0) + 1;
    });
    console.log(teamCounts);

    // Check if any kit has more than the allowed limit
    const isOverLimit = Object.values(teamCounts).some(
      (count) => count > props.playersFromSameTeamLimit
    );
    return isOverLimit;
  };

  const isOverSubs = (updatedIDArray) => {
    // return props.currentSubs > props.subsLimit ? true : false;
    // need to do the same as i did in topBar (maybe moving the functioanllity to this func and in topBar just show the current subs)
    // need to equal between the lineup with change (updatedIDArray => newSelected) to the previousLineup

    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);

    if (props.fantasyUser && props.fantasyUser.lineupsArr) {
      if (props.fantasyUser.startFromGameweek === props.currentGameweek) {
        const lineupCounter = newSelectedPlayers.reduce(
          (count, item) => count + 1,
          0
        );
        props.onCountingSubs(lineupCounter);
        return false;
      } 
      else {
        // compare current lineup (currentGameweek-1) to prev (currentGameweek-2)
        const prevLineup = props.fantasyUser.lineupsArr[props.currentGameweek - 2];
        const subsArr = newSelectedPlayers.filter(
          (player) =>
            !prevLineup.some((prevPlayer) => prevPlayer.id === player.id)
        );

        console.log(prevLineup);
        console.log(subsArr);
        
        if (subsArr.length > props.subsLimit) {
          return true;
        } else {
          props.onCountingSubs(subsArr.length);
          return false;
        }
      }
    } else {
      return false;
    }
  };

  const isMaxGoalkeepers = (updatedIDArray) => {
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const goalkeepers = newSelectedPlayers.filter((player) => player.position === "GK");

    return goalkeepers.length > 1 ? true : false;
  };

  const isMaxDefenders = (updatedIDArray) => {
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const defenders = newSelectedPlayers.filter((player) => player.position === "DF");

    return defenders.length > 5 ? true : false;
  };

  const isMaxMidfielders = (updatedIDArray) => {
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const midfielders = newSelectedPlayers.filter((player) => player.position === "MF");

    return midfielders.length > 5 ? true : false;
  };

  const isMaxForwards = (updatedIDArray) => {
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    const forwards = newSelectedPlayers.filter((player) => player.position === "FW");

    return forwards.length > 3 ? true : false;
  };

  ///----------------------------------------------------------
  //selectedRows - the ID array before the last click on some checkbox
  //selectedPlayers - object array of players  before the last click on some checkbox
  //newSelectedPlayers - the updated players (objects) array
  ///----------------------------------------------------------

  const handleCheckBox = (updatedIDArray) => {
    if (updatedIDArray.length > 11) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ההרכב מלא");
      console.log("ההרכב מלא");
    }

    if (isMaxGoalkeepers(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור שוער אחד בלבד!");
      console.log("ניתן לבחור שוער אחד בלבד!");
    }

    if (isMaxDefenders(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור עד 5 מגנים בלבד!");
      console.log("ניתן לבחור עד 5 מגנים בלבד!");
    }

    if (isMaxMidfielders(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור עד חמישה קשרים בלבד!");
      console.log("ניתן לבחור עד חמישה קשרים בלבד!");
    }

    if (isMaxForwards(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray);
      setSelectedRows(updatedIDArray);
      alert("ניתן לבחור עד 3 חלוצים בלבד!");
      console.log("ניתן לבחור עד 3 חלוצים בלבד!");
    }

    if (isOverBudget(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray, selectedRows);
      alert("חריגה מהתקציב");
      console.log("חריגה מהתקציב");
    }

    if (isOverSubs(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray, selectedRows);
      alert(" חריגה בכמות החילופים ");
      console.log("חריגה בכמות החילופים");
    }

    if (isOverPlayersFromSameTeam(updatedIDArray)) {
      updatedIDArray = cancelPickingSelectedRow(updatedIDArray, selectedRows);
      alert(
        `חריגה בכמות השחקנים מאותה הקבוצה. מותר ${props.playersFromSameTeamLimit} בלבד `
      );
      console.log("חריגה בכמות השחקנים מאותה הקבוצה");
    }

    removeCaptainIfNeeded(updatedIDArray);

    setSelectedRows(updatedIDArray);
    const newSelectedPlayers = convertIDArrToPlayersArr(updatedIDArray);
    setSelectedPlayers(newSelectedPlayers); // Store the selected players in the state
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
      field: "price",
      sort: "desc",
    },
  ]);

  return (
    <div className="players-list-root">
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={cols}
        disableColumnMenu
        checkboxSelection
        disableSelectionOnClick
        //hideFooter
        //hideFooterPagination
        //pagination
        selectionModel={selectedRows}
        onSelectionModelChange={handleCheckBox}
        pageSize={15}
        rowHeight={72}
        autoHeight
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
      />
    </div>
  );
}

export default PlayersList;