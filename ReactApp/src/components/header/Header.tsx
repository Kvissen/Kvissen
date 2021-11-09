// Erlend
import React from 'react';
import {Link, Stack, Typography} from "@mui/material"
import Grid from '@mui/material/Grid';
import logo from '../../ImageAssets/kvislogo.png';
import Box from '@mui/material/Box';
import {observer} from 'mobx-react';

import store from "../../stores/QuizStore";
import DropDownMenu from "./DropDownMenu";

function Header() {

    return (
        <Box className={"headerbox"}>
            <Grid container spacing={2}>
                <Grid item xs={4}> <Link href={"/"}><img src={logo} width="64" alt="Logo"/></Link> </Grid>
                <Grid item xs={4}>
                    <Box pt={2.6}>
                        <Typography variant="subtitle1" align={"center"}>
                            {showKvisIdOrMessage()}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Stack direction={"row-reverse"} pt={2}>
                        <DropDownMenu/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

function showKvisIdOrMessage() {
    return (store.quizId !== "") ? <p>Kvis: {store.quizId}</p> : <p>Enter code to start Kvis!</p>
}

const HeaderObserver = observer(Header)
export default HeaderObserver;






