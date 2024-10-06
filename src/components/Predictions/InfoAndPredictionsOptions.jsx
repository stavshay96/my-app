import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function InfoAndPredictionsOptions() {
    const news = "חדשות";
    const forum = "פורום";
    const statistics = "סטטיסטיקות";
    const myLeagues = "הליגות שלי";
    const expectedLineups = "הרכבים משוערים";

    return (
        <div>
            <ButtonGroup
                style={{
                position: 'fixed',
                top: '15%',
                right: '-1%',
                unicodeBidi: 'plaintext',
                width: '25%'
            }}>
                <Button className="btnInfoAndOptions1">
                    {news}
                </Button>
                <Button className="btnInfoAndOptions1">
                    {forum}
                </Button>
            </ButtonGroup>

            <ButtonGroup
                style={{
                position: 'fixed',
                top: '24%',
                right: '-1.5%',
                unicodeBidi: 'plaintext',
                width: '27%'
            }}>
                <Button
                    className="btnInfoAndOptions2"
                    style={{
                    backgroundColor: '#bae9a6'
                }}>
                    {myLeagues}
                </Button>
                <Button className="btnInfoAndOptions2">
                    {statistics}
                </Button>
            </ButtonGroup>

            <ButtonGroup
                style={{
                position: 'fixed',
                top: '30%',
                right: '-1.6%',
                unicodeBidi: 'plaintext',
                width: '27%'
            }}>
                <Button className="btnInfoAndOptions2">
                    {expectedLineups}
                </Button>
            </ButtonGroup>
        </div>
    )
}

export default InfoAndPredictionsOptions;