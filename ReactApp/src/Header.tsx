import React, {Component} from 'react';
import {Paper, Typography} from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import logo from './ImageAssets/kvislogo.png';
import Box from '@material-ui/core/Box';


var questionNumber = 53

export default class Header extends Component {
    render() {
        let questionNumberDisplay = questionNumber === 0 ? "" :
            <Typography variant="subtitle1" align={"center"}>Question {questionNumber}</Typography>

        return (<Paper>
            <Grid container spacing={2}>
                <Grid item xs={4}> <img  src={logo} width="64.dp" alt="Logo"/> </Grid>
                <Grid item xs={4} > <Box pt={3}>{questionNumberDisplay}</Box>     </Grid>
            </Grid>
        </Paper>);
    }
}