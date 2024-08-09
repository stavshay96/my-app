import React from "react";
import Button from 'react-bootstrap/Button';
import "./css/SpecialChips.css"



function SpecialChips(props) {


    const chips = [
        {
            chipID: 1,
            name: 'טריפל קפטן',
            style: {/*
                position: 'fixed',
                top: '17%',
                right: '52%',
                width: '9.5%'*/
            },
            isButtonDisabled: props.fantasyUser.tripleUsedInGameweek
    
        }, {
            chipID: 2,
            name: '11 חילופים',
            style: {/*
                position: 'fixed',
                top: '17%',
                right: '37.5%',
                width: '9.5%',
                unicodeBidi: 'plaintext'*/
            },
            isButtonDisabled: props.fantasyUser.wildCardUsedInGameweek
        }
    ]
    
    
    function CreateChip(chip) {
        const chipHandler = () => {
            if (chip.chipID === 1) {
                tripleHandler();
            }
            else if (chip.chipID === 2){
                wildCardHandler();
            }
            //alert(`special chip ${chip.chipID}`)
        }
    
        const tripleHandler = () =>{
            props.SetFantasyUser((prevData) => ({
                ...prevData,
                tripleUsedInGameweek : props.currentGameweek
            }))
           // alert("triple");
        }
    
        const wildCardHandler = () =>{
            props.SetFantasyUser((prevData) => ({
                ...prevData,
                wildCardUsedInGameweek : props.currentGameweek
            }))
            props.SetSubsLimit(props.fantasyType);
            //alert("wildCard");
        }
        
        const buttonClass = chip.isButtonDisabled ? 'disabledBtnChips' : 'btnChips';
        return (
            <Button key={chip.chipID} className={buttonClass} style={chip.style} 
            disabled={chip.isButtonDisabled} onClick={chipHandler}>
                {chip.name}
            </Button>
        )
    }

    return (
        <div className="chips-container" >
            {chips.map(CreateChip)}
        </div>
    )

}

export default SpecialChips;