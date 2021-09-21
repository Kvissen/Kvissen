import React, {Component} from 'react';
import {Box, TextField, Typography, Button, Link, Grid} from "@mui/material";
import {Redirect} from 'react-router-dom'
import {useHistory} from 'react-router-dom';
import {kvisStore} from './stores/KvisStore'

export default class EnterCode extends Component {

    render() {
        return (
            <Grid container spacing={2} alignContent={"center"} className={"entercodebg"}>
                <Grid item xs={6} md={4} margin={"128px auto"} className={"entercodebox"}>
                    <Typography align={"center"}>ENTER CODE</Typography>
                    <TextField
                        margin="normal"
                        required
                        id="code"
                        label="Kvis Code"
                        fullWidth
                        name="code"
                        autoComplete="code123"
                        autoFocus
                    />
                    <StartQuizComponent/>
                </Grid>
            </Grid>
        );
    }
}

const StartQuizComponent = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push('/kvis');
        kvisStore.checkIn("1234")
    }

    return (
        <Button onClick={handleClick}>
            Start Kvis!
        </Button>
    );
};

