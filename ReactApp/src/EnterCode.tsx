import React, {Component} from 'react';
import {Box, TextField, Typography, Button, Link} from "@mui/material";
import {Redirect} from 'react-router-dom'
import { useHistory } from 'react-router-dom';

export default class EnterCode extends Component {

    // Set initial state
    state = {
        checkedIn: false
    }

    render() {
        if (this.state.checkedIn) {
            return <Redirect to='/Kvis'/>
        }
        return (
            <Box m="auto" width={400}>
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
                <StartQuizComponent />
            </Box>
        );
    }
}

const StartQuizComponent = () => {
    const history = useHistory();
    const handleClick = () => history.push('/kvis');

    return (
        <Button type="button" onClick={handleClick}>
            Navigate to another route
        </Button>
    );
};

