import {React , useState} from "react";
import { DataGrid,  GridToolbar } from "@material-ui/data-grid";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./MatchesList.css"

const cols = [
    { field: "AwayTeam", headerName: "חוץ", headerAlign: 'center', width: 130, filterable: false, sortable: false, align: 'right', 
    renderCell: wrapCellTeamNameText ,  renderHeader: wrapHeaderText},
    { field: "ScoreAwayTeam", headerName: " ", headerAlign: 'right', type:"number", width: 30, filterable: false, sortable: false, align: 'right' },
    { field: "ScoreHomeTeam", headerName: " ", headerAlign: 'right',  type:"number", width: 30, filterable: false, sortable: false, align: 'right' },
    { field: "HomeTeam", headerName: "בית", headerAlign: 'center', width: 130, filterable: false, sortable: false, align: 'right',
     renderCell: wrapCellTeamNameText, renderHeader: wrapHeaderText },
]

const rows =[
    {id:1, HomeTeam: 'מכבי נתניה' , ScoreHomeTeam:'2', ScoreAwayTeam: '2', AwayTeam: 'מכבי חיפה'},
    {id:2, HomeTeam: 'מכבי ת"א' , ScoreHomeTeam:'-', ScoreAwayTeam: '-', AwayTeam: 'הפועל ב"ש'},
    {id:3, HomeTeam: 'מילאן' , ScoreHomeTeam:'-', ScoreAwayTeam: '-', AwayTeam: 'אינטר'},
    {id:4, HomeTeam: 'פסז' , ScoreHomeTeam:'-', ScoreAwayTeam: '-', AwayTeam: 'מנצסטר סיטי'},
    {id:5, HomeTeam: ' הפועל ת"א' , ScoreHomeTeam:'-', ScoreAwayTeam: '-', AwayTeam: 'בית"ר ירושלים'},
    {id:6, HomeTeam: 'מכבי הרצליה' , ScoreHomeTeam:'-', ScoreAwayTeam: '-', AwayTeam: 'בני יהודה'},
    {id:7, HomeTeam: 'ברצלונה' , ScoreHomeTeam:'-', ScoreAwayTeam: '-', AwayTeam: 'ריאל מדריד'},

]

function wrapCellTeamNameText(params) {
    return (
        <div style={{ whiteSpace: 'normal', lineHeight:'1.5', fontSize:'1.1vw', fontWeight: 'bold',}}>
            {params.value}
        </div>
    );
  }

  function wrapHeaderText(params) {
    return (
        <div style={{ whiteSpace: 'normal',lineHeight:'1.5', fontSize:'1.2vw', textDecoration:'underline' }}>
            {params.colDef.headerName}
        </div>
    );
  }
  
  

function MatchesList()
{
    const [gameweekNumber,SetGameweekNumber] = useState(25);
    const gameweek = "מחזור";

    return(
        <div>
            <ButtonGroup style={{position:'fixed', top:'44.8%', right:'5%', unicodeBidi:'plaintext', width:'15%' }}>
                <Button className= "btnLeftArrow"> <span>&#9664;</span></Button>
                <Button className= "btnGameweek"> {gameweek} {gameweekNumber} </Button>
                <Button className= "btnRightArrow"><span>&#9654;</span></Button>
            </ButtonGroup>


    <DataGrid
    style={{position:'fixed', top:'49.8%', right:'2%',
        width:'25%', height: '47%', backgroundColor: '#e0f9d5',     }}
    rows={rows}
    columns={cols}
    disableColumnMenu
    disableColumnSort
    hideFooter
    
    
    />
    </div>)
}

export default MatchesList;