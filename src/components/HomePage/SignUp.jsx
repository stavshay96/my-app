import {React, useState} from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import "./css/SignUp.css";
import axios from "axios";
import { useNavigate, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';

function SignUpClick() {
    alert("navigate to sign up page")
}

const styleSignUp = {
    backgroundColor: '#eeeeef',
    borderRadius: '2vw',
    border: '0.3vw solid #b6d7a8',
    display: 'inline-block',
    cursor: 'pointer',
    color: '#000000',
    position: 'fixed',
    top: '5%',
    right: '10%',
    fontFamily: 'sans-serif',
    fontSize: '1.5vw',
    padding: '0.5% 1%',
    textShadow: '0vw 0.1vw 0vw #2f6627',
    width: '10%',
    '&hover': {
        backgroundColor: '#b6d7a8'
    }
}

const SignUp = (props) => {
    let navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const [open,
        setOpen] = useState(false);
    const [isValidName,
        setIsValidName] = useState(true);
    const [isValidEmail,
        setIsValidEmail] = useState(true);
    const [isValidPassword,
        setIsValidPassword] = useState(true);
    const [enteredName,
        setEnteredName] = useState("");
    const [enteredEmail,
        setEnteredEmail] = useState("");
    const [enteredPassword,
        setEnteredPassword] = useState("");

    // let navigate =useNavigate();

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

    const openPopup = () => {
        setOpen(true);
    }

    const handleSignUpTrigger = () => {
        if(props.isFromHomePage===true)
        {
        return (
            <div>
                {/*props.showSignUp && <div>setOpen(true)</div>*/}
                <Button
                    className="btnSignUp"
                    style={{
                    position: 'fixed',
                    top: '5%',
                    right: '13.5%'
                }}>
                    הרשמה {/*console.log("SignUp")*/}
                </Button>
            </div>
        )}
        else{
            return(  <div>{setOpen(true)}</div>)
        }

    }

    const SignUpHandler = (event) => {
        event.preventDefault();
        console.log("enteredEmail");
        axios
            .post(`http://localhost:7777/User/SignUp`, {
            fullName: enteredName,
            email: enteredEmail,
            password: enteredPassword
        })
            .then((res) => {
                if (res.data.Status === "Sign Up succseeded")
                {
                    
                    setOpen(false);
                    document.cookie = `userID=${res.data.userInfo.userID}; path=/;`;
                    document.cookie = `fullName= ${res.data.userInfo.fullName}; path=/;`;
                    document.cookie = `email= ${res.data.userInfo.email}; path=/;`;
                    if(!isHomePage){
                        navigate("/", {
                            replace: true,
                        });
                       }
                       else{
                            window.location.reload(); 
                          
                       }
                    //props.changeUserInfo(res.data.userInfo);
                    //window.location.reload(); 
                    
    
                }     
                else{
                    alert(res.data.Reason);
                }
                console.log(res.data);
                /* navigate("/userHomePage", {
                        replace: true,
                    });*/
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
                    <Button
                        className="close-btn"
                        onClick={()=> {window.location.reload();}}
                        style={{
                        position: 'fixed',
                        top: '30%',
                        right: '30%',
                        fontSize: '1.25vw'
                    }}>
                        X
                    </Button>

                    <Form
                        className="formStyle"
                        style={{
                        position: 'fixed',
                        top: '35%',
                        right: '30%'
                    }}>
                        <Form.Group className="emailStyle" controlId="formBasicEmail">
                            <Form.Label
                                style={{
                                position: 'fixed',
                                top: '41.75%',
                                right: '33%',
                                fontSize: '1.6vw'
                            }}>:אימייל</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                style={{
                                position: 'fixed',
                                top: '41.8%',
                                right: '41%',
                                fontSize: '1.25vw'
                            }}
                                onChange={emailHandler}
                                type="email"
                                placeholder="Enter email"
                                value={enteredEmail}/>

                        </Form.Group>

                        <Form.Group className="nameStyle" controlId="formBasicName">
                            <Form.Label
                                style={{
                                position: 'fixed',
                                top: '49.75%',
                                right: '32.85%',
                                fontSize: '1.6vw'
                            }}>:שם מלא</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                style={{
                                position: 'fixed',
                                top: '49.8%',
                                right: '41%',
                                unicodeBidi: 'plaintext',
                                fontSize: '1.25vw'
                            }}
                                onChange={nameHandler}
                                type="name"
                                placeholder="Enter name"
                                value={enteredName}/>

                        </Form.Group>

                        <Form.Group className="passwordStyle" controlId="formBasicPassword">
                            <Form.Label
                                style={{
                                position: 'fixed',
                                top: '57.5%',
                                right: '32.85%',
                                fontSize: '1.6vw'
                            }}>:סיסמה</Form.Label>
                            <Form.Control
                                className="txtBoxStyle"
                                style={{
                                position: 'fixed',
                                top: '57.5%',
                                right: '41%',
                                fontSize: '1.25vw'
                            }}
                                value={enteredPassword}
                                onChange={passwordHandler}
                                type="password"
                                placeholder="Password"/>
                        </Form.Group>

                        <Button
                            className="btnSignUp"
                            variant="primary"
                            type="submit"
                            style={{
                            position: 'fixed',
                            top: '65%',
                            right: '45%',
                            fontSize: '1.6vw'
                        }}
                            onClick={SignUpHandler}>
                            הירשם
                        </Button>

                        <FontAwesomeIcon
                            icon={faFacebook}
                            style={{
                            position: 'fixed',
                            top: '75%',
                            right: '46.5%',
                            fontSize: '3vw',
                            color: "#2154ab"
                        }}/>
                        <FontAwesomeIcon
                            icon={faGoogle}
                            style={{
                            position: 'fixed',
                            top: '75%',
                            right: '50.5%',
                            fontSize: '3vw'
                        }}/>
                    </Form>
                </div>
            )}
        </Popup>
    )
}

export default SignUp;