import React, {Component} from 'react';
import {TextField, Typography, Button, Link, Grid} from "@mui/material";
import {inject, observer} from "mobx-react";
import {IMobxStore} from "./stores/mobxStore";
import {useHistory} from "react-router-dom";


interface storeProps {
    mobxStore?: IMobxStore;
}

@inject('mobxStore')
@observer
export default class EnterCode extends Component<storeProps> {
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
                    <Link href="/Kvis">
                        <Button onClick={this.handleClick}>
                            Start Kvis!
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }

    handleClick = () => {
        //useHistory().push("/kvis")
        const {setQuizId} = this.props.mobxStore!;
        setQuizId("1234");
    }
}



