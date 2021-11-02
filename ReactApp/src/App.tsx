import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {HashRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header/Header";
import EnterCodeObserver from "./components/enterCode/EnterCode";
import KvisBox from "./components/kvisBox/KvisBox";
import CreateKvisObserver from "./components/createKvis/CreateKvis";
import LoginRedirectObserver from "./components/login/LoginRedirect";
import LandingObserver from "./components/landing/Landing";
import KvisListObserver from "./components/kvisList/KvisList";
import LoginRecipientObserver from "./components/login/LoginRecipient";
import ErrorPage from "./components/error/errorPage";

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
                        <Route exact path="/create-kvis">
                            <CreateKvisObserver/>
                        </Route>
                        <Route exact path="/landing">
                            <LandingObserver/>
                        </Route>
                        <Route exact path="/kvis-list">
                            <KvisListObserver/>
                        </Route>
                        <Route exact path="/login-redirect">
                            <LoginRedirectObserver/>
                        </Route>
                        <Route exact path="/login-recipient">
                            <LoginRecipientObserver/>
                        </Route>
                        <Route exact path="/error-page">
                            <ErrorPage/>
                        </Route>
                        <Route render={() => <h1>404</h1>}/>
                    </Switch>
                </Grid>
            </Grid>
        </HashRouter>
    )
}

export default App;

