// Erlend
import React from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {store} from "../../stores/KvisStore";
import {observer} from "mobx-react";

function EnterCode() {
    return (
        <Grid container spacing={2} alignContent={"center"} className={"entercodebg"}>
            <Grid
                data-testid="entercode-test-container"
                item xs={6} md={4} margin={"128px auto"} className={"entercodebox"}>
                <Typography align={"center"}>ENTER CODE</Typography>
                <TextField
                    margin="normal"
                    required
                    id="code"
                    label="Kvis Code"
                    fullWidth
                    name="code"
                    data-testid="entercode-test-textfield"
                    autoFocus
                    value={store.kvisId}
                    onChange={(evt) => store.kvisId = evt.target.value}
                />

                <Button
                    data-testid="entercode-test-button"
                    disabled={(store.kvisId === "")} onClick={() => {
                    store.startQuiz();
                }}>
                    Start Kvis!
                </Button>
            </Grid>
        </Grid>
    )
}

const EnterCodeObserver = observer(EnterCode)
export default EnterCodeObserver;