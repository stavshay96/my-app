/* eslint-disable no-unused-vars */
/**************************************************/
/* signup form using the CSS of login form (same classes) from login.css */
/**************************************************/

import {React, useState} from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import "./css/SignUp.css";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';


const SignUp = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    const [open, setOpen] = useState(false);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [enteredName, setEnteredName] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");

    const nameHandler = (event) => {
        setIsValidName(true);
        setEnteredName(event.target.value);
    }

    const emailHandler = (event) => {
        setIsValidEmail(true);
        setEnteredEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setIsValidPassword(true);
        setEnteredPassword(event.target.value);
    }

    const handleSignUpTrigger = () => {
        if (props.isFromHomePage === true) {
            return (
                <div>
                    {/*props.showSignUp && <div>setOpen(true)</div>*/}
                    <Button
                        className="btnSignUp">
                        הרשמה
                    </Button>
                </div>
        )} else {
            return(  <div>{setOpen(true)}</div>)
        }
    }

    const SignUpHandler = (event) => {
        event.preventDefault();
        console.log("enteredEmail");

        axios.post(`https://pendel-server.onrender.com/User/SignUp`, {
            fullName: enteredName,
            email: enteredEmail,
            password: enteredPassword
        }).then((res) => {
                if (res.data.Status === "Sign Up succseeded")
                {
                    const maxAge = 10 * 365 * 24 * 60 * 60; // 10 years in seconds
                    setOpen(false);

                    document.cookie = `userID=${res.data.userInfo.userID}; path=/; max-age=${maxAge};`;
                    document.cookie = `fullName= ${res.data.userInfo.fullName}; path=/; max-age=${maxAge};`;
                    document.cookie = `email= ${res.data.userInfo.email}; path=/; max-age=${maxAge};`;

                    if (!isHomePage) {
                        navigate("/", {
                            replace: true,
                        });
                    } else {
                        window.location.reload(); 
                    }
                }     
                else {
                    alert(res.data.Reason);
                }
                console.log(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Popup
            trigger={handleSignUpTrigger}
            modal
            open={open}
            onClick={() => setOpen(true)}
            closeOnDocumentClick={false}>
            {close => (
                <div>
                    <Button className="close-btn"
                        onClick={()=> {window.location.reload();}}>
                        X
                    </Button>

                    <Form className="formStyle">
                        <Form.Group className="itemFormStyle" controlId="formBasicEmail">
                            <Form.Label>אימייל</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                onChange={emailHandler}
                                type="email"
                                placeholder="Enter email"
                                value={enteredEmail}/>

                        </Form.Group>

                        <Form.Group className="itemFormStyle" controlId="formBasicName">
                            <Form.Label>שם מלא</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                onChange={nameHandler}
                                type="name"
                                placeholder="Enter name"
                                value={enteredName}/>

                        </Form.Group>

                        <Form.Group className="itemFormStyle" controlId="formBasicPassword">
                            <Form.Label>סיסמה</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                value={enteredPassword}
                                onChange={passwordHandler}
                                type="password"
                                placeholder="Password"/>
                        </Form.Group>

                        <Button
                            className="btnSignUp"
                            variant="primary"
                            type="submit"
                            onClick={SignUpHandler}>
                            הירשם
                        </Button>
                        <div className="icons-social">
                            <FontAwesomeIcon icon={faFacebook}/>
                            <FontAwesomeIcon icon={faGoogle}/>
                        </div>
                    </Form>
                </div>
            )}
        </Popup>
    )
}

export default SignUp;