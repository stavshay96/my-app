import {React, useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { browserHistory } from 'react-router';


import Button from 'react-bootstrap/Button';

import "./Fantasy.css";
import LangBar from "./LangBar";



const Fantasy = (props) => {

 

  return(
    <div>
        <LangBar/>
    </div>
  )
}

export default Fantasy;
