// Erlend
import React from 'react';
import {Link, Stack, Typography} from "@mui/material"
import Grid from '@mui/material/Grid';
import logo from '../../ImageAssets/christmaslogo.png';
import Box from '@mui/material/Box';
import {observer} from 'mobx-react';

import store from "../../stores/KvisStore";
import DropDownMenu from "./DropDownMenu";

function Header() {

    return (
        <Box
            data-testid="header-test-container"
            className={"headerbox"}>
            <Grid
                data-testid="header-test-grid-container"
                container spacing={2}>
                <Grid item xs={4}> <Link href={"/"}><img data-testid="header-test-logo" src={logo} width="64" alt="Logo"/></Link> </Grid>
                <Grid item xs={4}>
                    <Box pt={2.6}>
                        <Typography
                            data-testid="header-test-quizname"
                            variant="subtitle1" align={"center"}>
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
    return (store.kvisCode !== "" && store.currentKvis.uuid !== "0") ? <div>Kvis: {store.kvisCode}</div> :
        <div>Enter code to start Kvis!</div>
}

const HeaderObserver = observer(Header)
export default HeaderObserver;






