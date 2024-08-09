import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import "./css/InfoAndFantasyOptions.css";
import {useNavigate} from "react-router-dom";

function InfoAndFantasyOptions(props) {
    const lineup11 = "הרכב 11";
    const squad15 = "סגל 15";
    const news = "חדשות";
    const forum = "פורום";

    const statistics = "סטטיסטיקות";
    const myLeagues = "הליגות שלי";
    const expectedLineups = "הרכבים משוערים";
    const drafts = "טיוטות";

    let navigate = useNavigate();

    const handleMyLeaguesButton = () =>{
        window.history.pushState({ navigationDirection: "back" }, "", `/Fantasy/${props.leagueChoice}`);
        navigate(`/Fantasy/${props.leagueChoice}/rooms`, {replace:false });

    }

    return (
        <div>
            <ButtonGroup className="btnGroupOptions"
                style={{/*
                position: 'absolute',
                top: '18%',
                right: '1.5%',
                unicodeBidi: 'plaintext',
                width: '25%',
                zIndex: '2'*/
            }}>
                <Button className="btnInfoAndOptions1">
                    {squad15}
                </Button>
                <Button
                    className="btnInfoAndOptions1"
                    style={{
                    backgroundColor: '#e1f9d7'
                }}>
                    {lineup11}
                </Button>
                <Button className="btnInfoAndOptions1">
                    {news}
                </Button>
                <Button className="btnInfoAndOptions1">
                    {forum}
                </Button>
            </ButtonGroup>

            <ButtonGroup className="btnGroupOptions"
                style={{/*
                position: 'absolute',
                top: '27%',
                right: '0.6%',
                unicodeBidi: 'plaintext',
                width: '27%',
                zIndex: '2'*/
            }}>
                <Button
                    className="btnInfoAndOptions2"
                    style={{/*
                    backgroundColor: '#bae9a6'*/
                }}
                onClick={handleMyLeaguesButton}>
                    {myLeagues}
                </Button>
                <Button className="btnInfoAndOptions2">
                    {statistics}
                </Button>
                <Button
                    className="btnInfoAndOptions2"
                    style={{
                    /*backgroundColor: '#bae9a6'*/
                }}>
                    {drafts}
                </Button>
                <Button className="btnInfoAndOptions2">
                    {expectedLineups}
                </Button>
            </ButtonGroup>

            {/*<ButtonGroup className="btnGroupOptions"
                style={{
                position: 'absolute',
                top: '33%',
                right: '0.6%',
                unicodeBidi: 'plaintext',
                width: '27%',
                zIndex: '2'
            }}>
                <Button
                    className="btnInfoAndOptions2"
                    style={{
                    backgroundColor: '#bae9a6'
                }}>
                    {drafts}
                </Button>
                <Button className="btnInfoAndOptions2">
                    {expectedLineups}
                </Button>
            </ButtonGroup>*/}
        </div>
    )
}

export default InfoAndFantasyOptions;