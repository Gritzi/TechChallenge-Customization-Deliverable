import React from 'react';
import style from './Main.module.scss';
import {Header} from '../components/Header';
import {Search} from '../components/Search';
import {Interactions} from '../components/Interactions';
import { Route, Switch } from 'react-router-dom';

export const Main = () => {
    return (
        <div className={style.Main}>
            <Header />
            <Switch>
                <Route exact path="/" component={Search} />
                <Route path="/interactions" component={Interactions} />
            </Switch>
        </div>
    )
}