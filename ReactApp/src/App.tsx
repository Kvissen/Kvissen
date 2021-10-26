import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {Route, Switch, HashRouter} from "react-router-dom";
import Header from "./components/header/Header";
import EnterCodeObserver from "./components/enterCode/EnterCode";
import KvisBox from "./components/kvisBox/KvisBox";

function App() {
    return (
        <HashRouter>
            <Grid container spacing={2} id={"maingrid"}>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
                <Grid item xs={12}>
                    <Switch>
                        <Route exact path="/">
                            <EnterCodeObserver/>
                        </Route>
                        <Route exact path="/kvis">
                            <KvisBox/>
                        </Route>
                        <Route render={() => <h1>404</h1>}/>
                    </Switch>
                </Grid>
            </Grid>
        </HashRouter>
    )
}

export default App;

