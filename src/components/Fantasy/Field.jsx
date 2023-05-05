import React from "react";
import Image from 'react-bootstrap/Image'
import "./Field.css"

function Field()
{
    return (
        <div>
        <img className="field-img" src={require('../../images/field5.png')}>

        </img>
        </div>
    )
}

export default Field;