import {React, useState} from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebook , faGoogle} from '@fortawesome/free-brands-svg-icons';


const styleLogin = {
    backgroundColor: '#eeeeef', borderRadius: '2vw', border: '0.3vw solid #b6d7a8',
    display: 'inline-block', cursor: 'pointer',color: '#000000',
    position:'fixed', top:'5%', right:'10%',fontFamily: 'sans-serif', 
    fontSize: '1.5vw', padding: '0.5% 1%', textShadow: '0vw 0.1vw 0vw #2f6627', width: '10%',
    '&hover': {  backgroundColor: '#b6d7a8'}
}


const Login = (props) => 
{
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
   // let navigate =useNavigate();

   const emailHandler=(event) =>
    {
        setIsValidEmail(true);
        setEnteredEmail(event.target.value)
    }

    const passwordHandler=(event) =>
    {
        setIsValidPassword(true);
        setEnteredPassword(event.target.value);
    }


    const LoginHandler = (event) =>
    {
        event.preventDefault();
        console.log("enteredEmail");
        axios.post(`http://localhost:7777/User/Login`, {
            email: enteredEmail,
            password: enteredPassword
        }).then((res) =>{
            console.log(res.data);
            console.log(res.data.userInfo);

            if (res.data.Status === "Login succssed")
            {
                
                setOpen(false);
               // document.cookie =  "userID " + res.data.userInfo.userID +  " fullName " +  res.data.userInfo.fullName;
                document.cookie = `userID=${res.data.userInfo.userID}`;
                document.cookie = `fullName= ${res.data.userInfo.fullName}`;
                document.cookie = `email= ${res.data.userInfo.email}`;
                props.changeUserInfo(res.data.userInfo);
               /*navigate("/Fantasy", {
                    replace: true,
                });*/
            }
            
           
        }).
        catch(error => {
        console.error(error);
        setOpen(false);
        });
        
    }


       return(
        /*<div>
            <Button style={{position:'absolute', padding:'100% 180%', top:'-7vw', left:'-15vw'}}>
            </Button>
        </div>  */
        <Popup trigger={ 
            
        <Button className="btnLogin" style={{position:'fixed', top:'5%', right:'10%'}}>
               התחברות {console.log("login")}
        </Button>}  modal open={open} onClick={()=>setOpen(true)}>
      {close =>(<div>
        <Button className="close-btn" onClick={close} style={{position:'fixed', top:'30%', right:'30%', fontSize: '1.25vw'}}>
        X
        </Button>
           
          <Form className="formStyle" style={{ position:'fixed', top:'35%', right:'30%'}}>
            <Form.Group className="emailStyle" controlId="formBasicEmail">
                 <Form.Label style={{position:'fixed', top:'42%', right:'33%', fontSize: '1.6vw'}}>:אימייל</Form.Label>
                 <Form.Control className="txtBoxStyle" style={{position:'fixed', top:'42%', right:'41%', fontSize: '1.25vw'} }value={enteredEmail} onChange={emailHandler}
                  type="email" placeholder="Enter email" />
            </Form.Group>
            

            <Form.Group className="passwordStyle" controlId="formBasicPassword">
                <Form.Label style={{position:'fixed', top:'49.5%', right:'32.9%', fontSize: '1.6vw'}}>:סיסמה</Form.Label>
                <Form.Control className="txtBoxStyle" style={{position:'fixed', top:'49.5%', right:'41%', fontSize: '1.25vw'}} value={enteredPassword} onChange={passwordHandler} 
                type="password" placeholder="Enter Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" >
            <Form.Check className="checkbox" type="checkbox" label="זכור אותי" style={{position:'fixed', top:'60%', right:'47%', fontSize: '1.25vw'}}/>
            </Form.Group>

             <Button className="btnLogin" variant="primary" type="submit" style={{position:'fixed', top:'65%', right:'45%'}}
            onClick={LoginHandler} >
              התחבר
            </Button>

            <FontAwesomeIcon icon={faFacebook} style={{position:'fixed', top:'75%', right:'46.5%', fontSize: '3vw', color: "#2154ab"}}/>
            <FontAwesomeIcon icon={faGoogle} style={{position:'fixed', top:'75%', right:'50.5%', fontSize: '3vw'}}/>
        </Form>
        </div>

      )}
        </Popup>
        
       )
  }
            
                
 /* <div>
  <Button className="btnLogin" style={{position:'absolute', padding:'1000% 1000%', top:'-7vw', left:'-15vw'}}>
     Popup Login content here !!
  </Button>
</div>*/



export default Login;