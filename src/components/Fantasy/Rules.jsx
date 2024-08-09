import React from "react";
import "./css/Rules.css"
import {Button} from "react-bootstrap";

function Rules() {
    return (
        <div className="rules-container">
            <Button
                className="btnRules"
                style={{/*
                position: 'absolute',
                top: '4.5%',
                left: '27%'*/
            }}>
                חוקים
            </Button>
        </div>
    )
}

export default Rules;