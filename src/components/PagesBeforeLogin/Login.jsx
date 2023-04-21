
import {React, useState} from "react";
import Button from "react-bootstrap/esm/Button";
import Popup from 'reactjs-popup';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



function LoginClick()
{
    alert("navigate to log in page")
}

const styleLogin = {
    backgroundColor: '#eeeeef', borderRadius: '29px', border: '3px solid #b6d7a8',
    display: 'inline-block', cursor: 'pointer',color: '#000000',
    position:'fixed', top:'5%', right:'10%',fontFamily: 'sans-serif', 
    fontSize: '1.5vw', padding: '0.5% 1%', textShadow: '0px 1px 0px #2f6627', width: '10%',
    '&hover': {  backgroundColor: '#b6d7a8'}
}


const Login = (props) => 
{
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
           /* navigate("/userHomePage", {
                        replace: true,
                    });*/
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
        </Button>}  modal open={open} onClose={() => setOpen(false)}>

        <Button className="close-btn" onClick={() => setOpen(false)} style={{position:'fixed', top:'30%', right:'30%'}}>
        X
        </Button>
           
          <Form className="formStyle" style={{position:'fixed', top:'35%', right:'30%'}}>
            <Form.Group className="emailStyle" controlId="formBasicEmail">
                 <Form.Label style={{position:'fixed', top:'42%', right:'33%'}}>:אימייל</Form.Label>
                 <Form.Control className="txtBoxStyle" style={{position:'fixed', top:'42%', right:'41%', fontSize: 18} }value={enteredEmail} onChange={emailHandler}
                  type="email" placeholder="Enter email" />
                  
            </Form.Group>
         

            <Form.Group className="passwordStyle" controlId="formBasicPassword">
                <Form.Label style={{position:'fixed', top:'50%', right:'32.5%'}}>:סיסמה</Form.Label>
                <Form.Control className="txtBoxStyle" style={{position:'fixed', top:'49.5%', right:'41%', fontSize: 18}} value={enteredPassword} onChange={passwordHandler} 
                type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" >
            <Form.Check className="checkbox" type="checkbox" label="זכור אותי" />
            </Form.Group>



             <Button className="btnLogin" variant="primary" type="submit" style={{position:'fixed', top:'67%', right:'45%'}}
            onClick={LoginHandler}>
              התחבר
            </Button>
    </Form>

              
        </Popup>
        
       )
  }
            
                
 /* <div>
  <Button className="btnLogin" style={{position:'absolute', padding:'1000% 1000%', top:'-7vw', left:'-15vw'}}>
     Popup Login content here !!
  </Button>
</div>*/



export default Login;