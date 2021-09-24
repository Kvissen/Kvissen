import React, {Component} from 'react';
import {Box, TextField, Typography, Button, Link, Grid} from "@mui/material";
import {inject, Observer, observer, Provider} from "mobx-react";
import {IKvisStore} from "./stores/kStore";
import {stores} from "./stores";

interface storeProps {
    kStore?: IKvisStore;
}

@inject('kStore')
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
                    <Link>
                        <Button onClick={this.handleClick}>
                            Start Kvis!
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }

    handleClick = () => {
        const {setQuizId} = this.props.kStore!;
        setQuizId("1234");
    }
}

/*
@Observer
function StartQuiz() {
    const history = useHistory();
    const store = useStore()

    const handleClick = () => {
        history.push('/kvis');
        const {setQuizId} = kStore!;
        setQuizId("1234");
    }
    return (
        <Button onClick={handleClick}>
            Start Kvis!
        </Button>
    );
}

 */



