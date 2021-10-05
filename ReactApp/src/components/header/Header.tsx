import React, {Component} from 'react';
import {Typography} from "@mui/material"
import Grid from '@mui/material/Grid';
import logo from '../../ImageAssets/kvislogo.png';
import Box from '@mui/material/Box';

class Header extends Component {
    render() {
        const quizIdText = "Quiz ID: 1234";

        return (
            <Box className={"headerbox"}>
                <Grid container spacing={2}>
                    <Grid item xs={4}> <img src={logo} width="64" alt="Logo"/> </Grid>
                    <Grid item xs={4}> <Box pt={3}> {HeaderText(quizIdText)} </Box> </Grid>
                </Grid>
            </Box>
        )
    }
}



function HeaderText(text: String) {
    return (
        <Typography variant="subtitle1" align={"center"}>{text}</Typography>
    );
}

export default Header;




