import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import questionimage from './ImageAssets/boygeorge.jpg';

export default class QuestionBox extends Component {
    render() {
        return <Grid container className={"questionbox"}>
            <Grid item xs={12} md={12}>
                <p>Do you really want to hurt me?</p>
            </Grid>
            <Grid item xs={12} md={12}>
                <img src={questionimage} width="200.dp" alt="george" />
            </Grid>

        </Grid>
    }
}