import React, {useState} from 'react';
import style from './Main.module.scss';
import {Header} from '../components/Header';
import {Search} from '../components/Search';
import {Interactions} from '../components/Interactions';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

export const Main = () => {

    const [possibleUserData, setPossibleUserData] = useState();

    return (
        <div className={style.Main}>
            <Header setPossibleUserData={setPossibleUserData}/>
            <Switch>
                <Route exact path="/" component={Search} />
                <Route path="/interactions" render={props => <Interactions userData={possibleUserData}/>} />
            </Switch>
        </div>
    )
}