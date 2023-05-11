import React from "react";
import Button from 'react-bootstrap/Button';
import "./SpecialChips.css"

const chips = [
    {
        chipID: 1,
        name: 'טריפל קפטן',
        style: { position:'absolute', top:'31%', right:'37%',}
    },
    {
        chipID: 2,
        name: '11 חילופים',
        style: { position:'absolute', top:'31%', right:'51.5%',unicodeBidi:'plaintext',}
    },
    

]

function CreateChip(chip){
    return (
               <Button key={chip.chipID} className="btnChips"  style= {chip.style}>
                {chip.name}
                </Button>  
             )
}


function SpecialChips()
{

    return(
        <div>
        {chips.map(CreateChip)}
        </div>
    )

}

export default SpecialChips;