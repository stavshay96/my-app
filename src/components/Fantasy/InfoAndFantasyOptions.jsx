import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./InfoAndFantasyOptions.css"

function InfoAndFantasyOptions()
{
    const lineup11 = "הרכב 11";
    const squad15 = "סגל 15";
    const news = "חדשות";
    const forum = "פורום";

    const statistics ="סטטיסטיקות";
    const myLeagues = "הליגות שלי";
    const expectedLineups = "הרכבים משוערים";
    const drafts = "טיוטות";

    return(
        <div>
          <ButtonGroup style={{position:'fixed', top:'15%', right:'-1%', unicodeBidi:'plaintext', width:'25%'}} >
           <Button className="btnInfoAndOptions1"> {squad15} </Button>
           <Button className="btnInfoAndOptions1" style={{backgroundColor: '#bae9a6'}}> {lineup11} </Button>
           <Button className="btnInfoAndOptions1"> {news} </Button>
           <Button className="btnInfoAndOptions1"> {forum} </Button>
          </ButtonGroup>

          <ButtonGroup style={{position:'fixed', top:'24%', right:'-1.5%', unicodeBidi:'plaintext', width:'27%'}} >
           <Button className="btnInfoAndOptions2" style={{backgroundColor: '#bae9a6'}}> {myLeagues} </Button>
           <Button className="btnInfoAndOptions2"> {statistics} </Button>
          </ButtonGroup>

          <ButtonGroup style={{position:'fixed', top:'30%', right:'-1.6%', unicodeBidi:'plaintext', width:'27%'}} >
           <Button className="btnInfoAndOptions2" style={{backgroundColor: '#bae9a6'}}> {drafts} </Button>
           <Button className="btnInfoAndOptions2"> {expectedLineups} </Button>
          </ButtonGroup>
        </div>
    )
}

export default InfoAndFantasyOptions;