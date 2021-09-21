import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Header from "./Header";
import EnterCode from "./EnterCode";
import Kvis from "./Kvis";
import KvisStore from "./stores/KvisStore";

const kvisStore = new KvisStore();

function App() {
    return (
        <Router>
            <Grid container spacing={2} id={"maingrid"}>
                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12}>
                    <Switch>
                        <Route exact path="/">
                            <EnterCode/>
                        </Route>
                        <Route exact path="/kvis">
                            <Kvis/>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    )
}


export default App;