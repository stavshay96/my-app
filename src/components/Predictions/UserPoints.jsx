import React from "react";
import {Button} from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import "./css/UserPoints.css";

function UserPoints() {
    var weeklyPoints = 27;
    var totalPoints = 524;
    const user = document.cookie;

    return (
        <div>
            <Button
                className="PbtnPoints"
                style={{
                position: 'fixed',
                top: '20%',
                left: '81%',
                unicodeBidi: 'plaintext'
            }}>
                <Badge>
                    סך נקודות שבועי:
                    <br/> {user? weeklyPoints:0}
                </Badge>
                <hr className="seperator"/>
                <Badge>
                    סך נקודות כללי:
                    <br/> {user? totalPoints:0}
                </Badge>
            </Button>
        </div>
    )
}

export default UserPoints;