/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import "./css/Login.css";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import SignUp from "./SignUp";


const Login = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    
    const [open, setOpen] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [showSignUp, setSignUpPopup] = useState(false);

    // Automatically open the popup when not on the home page
    useEffect(() => {
        if (location.pathname !== "/") {
            setOpen(true);
        }
    }, [location.pathname]);

    const emailHandler = (event) => {
        setIsValidEmail(true);
        setEnteredEmail(event.target.value)
    }

    const handleShowSignUp = () => {
        setSignUpPopup(true)
    }

    const passwordHandler = (event) => {
        setIsValidPassword(true);
        setEnteredPassword(event.target.value);
    }

    const handleTrigger = () => {
        if (location.pathname === "/") {
            return (
                <Button className="btnLogin">
                    התחברות
                </Button>
            );
        } else {
            return (
                <div>
                    <Button onClick={() => setOpen(true)}>
                        Open Login
                    </Button>
                </div>
            );
        }
    };
    

    const toSignUp = (close) => {
        setSignUpPopup(true)

    }

    const isFromHomePage = false;

    const LoginHandler = (event) => {
        event.preventDefault();
        console.log("enteredEmail");
        axios.post(`https://pendel-server.onrender.com/User/Login`, {
            email: enteredEmail,
            password: enteredPassword
        })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.userInfo);

                if (res.data.Status === "Login succseeded") {
                    const maxAge = 10 * 365 * 24 * 60 * 60; // 10 years in seconds
                    setOpen(false);
                    document.cookie = `userID=${res.data.userInfo.userID}; path=/; max-age=${maxAge};`;
                    document.cookie = `fullName= ${res.data.userInfo.fullName}; path=/; max-age=${maxAge}`;
                    document.cookie = `email= ${res.data.userInfo.email}; path=/; max-age=${maxAge}`;
                    props.changeUserInfo(res.data.userInfo);
                    
                    if (!isHomePage) {
                        window.location.reload();
                    }

                } else {
                    alert(res.data.Reason);
                }
            })
            .catch(error => {
                alert(error);
                console.error(error);
                setOpen(false);
            });
    }

    return (
        <Popup
            trigger={handleTrigger}
            modal
            open={open}
            onClick={() => setOpen(true)}
            closeOnDocumentClick={false}>
            {close => (
                <div>
                    <Button
                        className="close-btn"
                        onClick={(isHomePage
                        ? close
                        : () => navigate("/", {replace: true}))}>
                        X
                    </Button>

                    <Form className="formStyle">
                        <Form.Group className="itemFormStyle" controlId="formBasicEmail">
                            <Form.Label>אימייל</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                value={enteredEmail}
                                onChange={emailHandler}
                                type="email"
                                placeholder="Enter email"/>
                        </Form.Group>

                        <Form.Group className="itemFormStyle" controlId="formBasicPassword">
                            <Form.Label>
                                <span dir="rtl">סיסמה
                                </span>
                            </Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                value={enteredPassword}
                                onChange={passwordHandler}
                                type="password"
                                placeholder="Enter Password"/>
                        </Form.Group>

                        <Form.Group className="checkboxFormStyle" controlId="formBasicCheckbox">
                            <Form.Check className="checkbox" type="checkbox" label="זכור אותי"/>
                        </Form.Group>

                        <Button
                            className="btnLogin"
                            variant="primary"
                            type="submit"
                            onClick={LoginHandler}>
                            התחבר
                        </Button>

                        <Button className="moveToSignUp" onClick={() => toSignUp(close)}>
                            עדיין אין לך משתמש? לחץ כאן להרשמה</Button>
                        {showSignUp && <SignUp
                            isFromHomePage={isFromHomePage}
                            showSignUp={showSignUp}
                            handleShowSignUp={handleShowSignUp}/>}
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

export default Login;