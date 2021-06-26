
 /* tslint:disable */

import {Header as UIHeader, HeaderName, HeaderMenuItem, HeaderNavigation, HeaderMenu, InlineNotification, HeaderGlobalBar, HeaderGlobalAction, HeaderPanel, Switcher, SwitcherItem, SwitcherDivider, TextInput, Button} from 'carbon-components-react';
import {Login20, Task20} from '@carbon/icons-react';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {api_base_address, calcEndpoint} from '../util/backend_adress';

export interface HeaderProps {
  setPossibleUserData: (data: any) => void;
}

export const Header: React.FC<HeaderProps> = ({setPossibleUserData}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginClickedState, setLoginClickedState] = useState<"success" | "fail" | undefined>();
  const [registerClickedState, setRegisterClickedState] = useState<"success" | "fail" | undefined>();
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const [registerMessage, setRegisterMessage] = useState("");


  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const goRegister = () => {
    axios.post(calcEndpoint("register"), {
      username: credentials.username,
      password: credentials.password
    }).then((res) => {
      setRegisterMessage(res.data);
      setRegisterClickedState("success");
    }).catch(err => {
      setRegisterMessage(err.response.data);
      setRegisterClickedState("fail");
    });
  }

  const goLogin = () => {

    axios.post(calcEndpoint("login"), {
      username: credentials.username,
      password: credentials.password
    }, {
      withCredentials: true
    }).then((res) => {
      setLoginClickedState("success");
      getUserData();
      setLoginMessage(res.data);
      setLoggedInUsername(credentials.username);
    }).catch(err => {
      setLoginClickedState("fail");
      setLoginMessage(err.response.data)
    });
  }

  const getUserData = () => {
    axios.get(calcEndpoint("userdata"), {
      withCredentials: true
    }).then(res => setPossibleUserData(res.data))
  }

    return (
    <UIHeader aria-label="IBM Platform Name">
    
      <HeaderName prefix=''>
        <Link to='/' style={{color: "white", textDecoration: "none"}}>[DigiPIL]</Link>
      </HeaderName>
      <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem>
            <Link style={{color: "white", textDecoration: "none"}} to='/'> Find a PIL</Link>
          </HeaderMenuItem>
          <HeaderMenuItem>
          <Link style={{color: "white", textDecoration: "none"}} to='/interactions'> Find Drug Interaction</Link></HeaderMenuItem>
        </HeaderNavigation>
      <HeaderGlobalBar>
      {
        loggedInUsername && <HeaderName prefix="">Hello, {loggedInUsername}</HeaderName>
      }
      <HeaderGlobalAction aria-label="Login" onClick={() => {
        setIsOpen(!isOpen);
        setIsRegisterOpen(false)
      }}>
          <Login20 />
        </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="Register" onClick={() => {setIsRegisterOpen(!isRegisterOpen); setIsOpen(false)}}>
          <Task20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel aria-label="Header Panel" expanded={isOpen}>
        <Switcher aria-label="Switcher Container">
        
        <h3>
          Login
        </h3>

        <TextInput
          id="user"
          placeholder="Username"
          labelText=""
          style={{
            width: "200px",
            marginBottom: "1rem",
            marginTop: "1rem"
          }}
          onChange={event => setCredentials({
            ...credentials,
            username: event.target.value
          })}
        />  
          <TextInput.PasswordInput
            id="user"
            placeholder="Password"
            labelText=""
            style={{
              width: "200px",
              
            }}
            onChange={event => setCredentials({
              ...credentials,
              password: event.target.value
            })}
          />

        
          <Button style={{
           
            marginTop: "1rem"
          }} onClick={goLogin}>
            Login
          </Button>

          {
            loginClickedState && <InlineNotification style={{width: "80%"}} kind={loginClickedState === "success" ? "info" : "error"} title={loginMessage} onCloseButtonClick={() => setLoginClickedState(undefined)}/>
          }
        
      </Switcher>
    </HeaderPanel>
    <HeaderPanel aria-label="Header Panel" expanded={isRegisterOpen}>
        <Switcher aria-label="Switcher Container">
        
        <h3>
          Register
        </h3>

        <TextInput
          id="user"
          placeholder="Username"
          labelText=""
          style={{
            width: "200px",
            marginBottom: "1rem",
            marginTop: "1rem"
          }}
          onChange={event => setCredentials({
            ...credentials,
            username: event.target.value
          })}
        />  
          <TextInput.PasswordInput
            id="user"
            placeholder="Password"
            labelText=""
            style={{
              width: "200px",
              
            }}
            onChange={event => setCredentials({
              ...credentials,
              password: event.target.value
            })}
          />
          <div  style={{
              marginBottom: "1rem",
              
            }}> 

          </div>        
          <Button style={{
           
            marginTop: "1rem"
          }} onClick={goRegister}>
            Register
          </Button>
          {
            registerClickedState && <InlineNotification style={{width: "80%"}} kind={registerClickedState === "success" ? "info" : "error"} title={registerMessage} onCloseButtonClick={() => setRegisterClickedState(undefined)}/>
          }
        
      </Switcher>
    </HeaderPanel>
    </UIHeader>
  )};