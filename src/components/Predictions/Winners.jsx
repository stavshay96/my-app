import React from "react";
import {Button} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import "./css/UserPoints.css";
import TopScorer from "./data/TopScorer";
import assistPlayers from "./data/TopAssistPlayer";
import Champions from "./data/Champions";

function Winners(props) {
    var weeklyPoints = 27;
    var totalPoints = 524;
    const user = document.cookie;

    return (
        <div>
            <Button
                className="PbtnPoints"
                style={{
                position: 'fixed',
                top: '25%',
                left: '79.5%',
                width: '15%',
                unicodeBidi: 'plaintext',
                backgroundImage: `url(https://img.freepik.com/premium-photo/colorful-defocus-motions-lights-bokeh-lights-blurred-background-effect_87555-1288.jpg?w=900)`,
                backgroundSize: 'cover', // Adjust the background size as needed
            }}>
                <Badge>
                    אלופה:
                    <br/>
                    <select
                        style={{
                          width: '100%',
                          fontSize: '1vw',
                          direction: 'rtl',
                          textAlign: 'right',
                          color: '#797979'
                        }}
                      >
                        <option value=""></option>
                        {Champions.map((player) => (
                          <option
                            key={player.id}
                            value={player.team}
                            style={{ lineHeight: '2' }} // Set the line height to center vertically
                          >
                            {player.team}
                          </option>
                        ))}
                      </select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך השערים:
                    <br/>
                    <select
                        style={{
                          width: '100%',
                          fontSize: '1vw',
                          direction: 'rtl',
                          textAlign: 'right',
                          color: '#797979'
                        }}
                      >
                        <option value=""></option>
                        {TopScorer.map((player) => (
                          <option
                            key={player.id}
                            value={player.playerName}
                            style={{ lineHeight: '2' }} // Set the line height to center vertically
                          >
                            {player.playerName}
                          </option>
                        ))}
                      </select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך הבישולים:
                    <br/> <select
                        style={{
                          width: '100%',
                          fontSize: '1vw',
                          direction: 'rtl',
                          textAlign: 'right',
                          color: '#797979'
                        }}
                      >
                        <option value=""></option>
                        {assistPlayers.map((player) => (
                          <option
                            key={player.id}
                            value={player.playerName}
                            style={{ lineHeight: '2' }} // Set the line height to center vertically
                          >
                            {player.playerName}
                          </option>
                        ))}
                      </select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך הצהובים:
                    <br/> <select style={{width: '100%', fontSize: '1vw'}}></select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך האדומים:
                    <br/> <select style={{width: '100%', fontSize: '1vw'}}></select>
                </Badge>
            </Button>
        </div>
    )
}

export default Winners;