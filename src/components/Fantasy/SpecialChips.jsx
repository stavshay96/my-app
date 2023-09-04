import React from "react";
import Button from 'react-bootstrap/Button';
import "./css/SpecialChips.css"

const chips = [
    {
        chipID: 1,
        name: 'טריפל קפטן',
        style: {
            position: 'fixed',
            top: '17%',
            right: '52%',
            width: '9.5%'
        }
    }, {
        chipID: 2,
        name: '11 חילופים',
        style: {
            position: 'fixed',
            top: '17%',
            right: '37.5%',
            width: '9.5%',
            unicodeBidi: 'plaintext'
        }
    }
]

function CreateChip(chip) {
    return (
        <Button key={chip.chipID} className="btnChips" style={chip.style}>
            {chip.name}
        </Button>
    )
}

function SpecialChips() {
    return (
        <div>
            {chips.map(CreateChip)}
        </div>
    )

}

export default SpecialChips;