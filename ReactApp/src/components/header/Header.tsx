import React from 'react';
import {Typography} from "@mui/material"
import Grid from '@mui/material/Grid';
import logo from '../../ImageAssets/kvislogo.png';
import Box from '@mui/material/Box';
import {observer} from 'mobx-react';
// Context is an alternative to injection.
// A 'global' variable limited to those classes who have access to the context
import store from "../../stores/QuizStore";

function Header() {

    return (
        <Box className={"headerbox"}>
            <Grid container spacing={2}>
                <Grid item xs={4}> <img src={logo} width="64" alt="Logo"/> </Grid>
                <Grid item xs={4}>
                    <Box pt={3}> {
                        <Typography variant="subtitle1" align={"center"}>{
                            store.quiz.name + " (" + store.quiz.id + ")"
                        }
                        </Typography>}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

const HeaderObserver = observer(Header)
export default HeaderObserver;






