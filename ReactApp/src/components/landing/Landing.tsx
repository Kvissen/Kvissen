import {observer} from "mobx-react";
import {Box, Button, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import {useHistory} from "react-router-dom";

export function Landing() {

    const name = "Christian"
    const history = useHistory();
    return (
        <div className="margin-container">
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                <h1 data-testid="landing-test-header-h1">Welcome {name} to the Kvis</h1>
                <h3 data-testid="landing-test-header-h3">You have the following options</h3>
            </Box>

            <Box mt={4} mb={4} display="flex"
                 justifyContent="center"
                 alignItems="center"
            >
                <Grid
                    data-testid="landing-test-grid-options"
                    direction='column' container spacing={4} alignItems={"center"}>
                    <Grid item sm={6}>
                        <Button
                            className="basic-button"
                            variant="contained"
                            data-testid="landing-test-add-kvis"
                            sx={{width: 200}}
                            startIcon={<AddIcon/>}
                            onClick={() => {
                                history.push("/create-kvis")
                            }}
                        >
                            Add Kvis
                        </Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Button
                            className="basic-button"
                            sx={{width: 200}}
                            variant="contained"
                            data-testid="landing-test-kvis-list"
                            startIcon={<ViewListIcon/>}
                            onClick={() => {
                                history.push("/kvis-list")
                            }}
                        >
                            Your Kvisses
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

const LandingObserver = observer(Landing)
export default LandingObserver;