import React from 'react';
import './App.css';
import Grid from '@mui/material/Grid';
import {HashRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header/Header";
import EnterCodeObserver from "./components/enterCode/EnterCode";
import CreateKvisObserver from "./components/createKvis/CreateKvis";
import LoginRedirectObserver from "./components/login/LoginRedirect";
import LandingObserver from "./components/landing/Landing";
import KvisListObserver from "./components/kvisList/KvisList";
import LoginRecipientObserver from "./components/login/LoginRecipient";
import ErrorPage from "./components/error/ErrorPage";
import PlayKvisObserver from "./components/playKvis/PlayKvis";
import KvisSummaryObserver from "./components/playKvisSummary/KvisSummary";
import GuardedRoute from "./util/GuardedRoute";
import {isAuthenticated} from "./util/Util";

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
                        <Route exact path="/play-kvis">
                            <PlayKvisObserver/>
                        </Route>
                        <Route exact path="/summary-kvis">
                            <KvisSummaryObserver/>
                        </Route>
                        <GuardedRoute path="/create-kvis" component={CreateKvisObserver} auth={isAuthenticated()}/>
                        <GuardedRoute path='/landing' component={LandingObserver} auth={isAuthenticated()} />
                        <GuardedRoute path="/kvis-list" component={KvisListObserver} auth={isAuthenticated()}/>
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

