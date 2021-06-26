
 /* tslint:disable */

import {Header as UIHeader, HeaderName, HeaderMenuItem, HeaderNavigation, HeaderMenu, HeaderGlobalBar, HeaderGlobalAction, HeaderPanel, Switcher, SwitcherItem, SwitcherDivider, TextInput, Button} from 'carbon-components-react';
import {Login20, Task20} from '@carbon/icons-react';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);


  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const goRegister = () => {
    axios.post("http://0.0.0.0:8080/register", {
      username: credentials.username,
      password: credentials.password
    }).then(() => {});
  }

  const goLogin = () => {
    axios.post("http://0.0.0.0:8080/login", {
      username: credentials.username,
      password: credentials.password
    }, {
      withCredentials: true
    }).then(() => getUserData());
  }

  const getUserData = () => {
    axios.get("http://0.0.0.0:8080/login", {
      withCredentials: true
    }).then(data => console.log(data))
  }

    return (
    <UIHeader aria-label="IBM Platform Name">
    
      <HeaderName prefix=''>
        <Link to='/' style={{color: "white", textDecoration: "none"}}>[DigiPIL]</Link>
      </HeaderName>
      <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem>
            <Link style={{color: "white", textDecoration: "none"}} to='/'> Find PIL</Link>
          </HeaderMenuItem>
          <HeaderMenuItem>
          <Link style={{color: "white", textDecoration: "none"}} to='/interactions'> Find Drug Interaction</Link></HeaderMenuItem>
        </HeaderNavigation>
      <HeaderGlobalBar>
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
        
      </Switcher>
    </HeaderPanel>
    </UIHeader>
  )};