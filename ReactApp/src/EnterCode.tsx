import React, {Component} from 'react';
import {Box, TextField, Typography} from "@mui-material";


export default class EnterCode extends Component {
    render() {
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
            </Box>
        );
    }
}