import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Header from "./Header";
import EnterCode from "./EnterCode";
import Kvis from "./Kvis";
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
                            <Kvis/>
                        </Route>
                        <Route render={() => <h1>404</h1>}/>
                    </Switch>
                </Grid>
            </Grid>
        </Router>
    )


}

export default observer(App);

