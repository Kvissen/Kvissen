import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Header from "./components/header/Header";
import EnterCode from "./components/enterCode/EnterCode";
import KvisBox from "./components/kvisBox/KvisBox";
import {observer} from "mobx-react-lite";
import {stores} from "./stores";
import {Provider} from "mobx-react";

function App() {
    return (
        <Router>
            <Grid container spacing={2} id={"maingrid"}>
                <Grid item xs={12}>
                    <Provider {...stores}>
                        <Header/>
                    </Provider>
                </Grid>
                <Grid item xs={12}>
                    <Switch>
                        <Route exact path="/">
                            <Provider {...stores}>
                                <EnterCode/>
                            </Provider>
                        </Route>
                        <Route exact path="/kvis">
                            <KvisBox/>
                        </Route>
                        <Route render={() => <h1>404</h1>}/>
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    )


}

export default observer(App);

