import React from "react";
import {Button} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import "./css/UserPoints.css";
import Players from "./data/Players";

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
                top: '30%',
                left: '79.5%',
                width: '15%',
                unicodeBidi: 'plaintext',
                backgroundImage: `url(https://img.freepik.com/premium-photo/colorful-defocus-motions-lights-bokeh-lights-blurred-background-effect_87555-1288.jpg?w=900)`,
                backgroundSize: 'cover', // Adjust the background size as needed
            }}>
                <Badge>
                    אלופה:
                    <br/>
                    <select style={{width: '100%', fontSize: '1.3vw'}}></select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך השערים:
                    <br/> <select style={{width: '100%', fontSize: '1.3vw'}}></select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך הבישולים:
                    <br/> <select style={{width: '100%', fontSize: '1.3vw'}}></select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך הצהובים:
                    <br/> <select style={{width: '100%', fontSize: '1.3vw'}}></select>
                </Badge>
                <hr className="seperator"/>
                <Badge>
                  מלך האדומים:
                    <br/> <select style={{width: '100%', fontSize: '1.3vw'}}></select>
                </Badge>
            </Button>
        </div>
    )
}

export default Winners;