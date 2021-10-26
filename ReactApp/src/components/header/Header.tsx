import React from 'react';
import {Link, Stack, Typography} from "@mui/material"
import Grid from '@mui/material/Grid';
import logo from '../../ImageAssets/kvislogo.png';
import Box from '@mui/material/Box';
import {observer} from 'mobx-react';
// Context is an alternative to injection.
// A 'global' variable limited to those classes who have access to the context
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
                            {store.quiz.name + " (" + store.quiz.id + ")"}
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

const HeaderObserver = observer(Header)
export default HeaderObserver;






