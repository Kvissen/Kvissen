import {observer} from "mobx-react";
import {Grid} from "@mui/material";

export function Landing() {

    return (
        <Grid>
            <h1>
                Du er på Landing
            </h1>
        </Grid>
    )
}

const LandingObserver = observer(Landing)
export default LandingObserver;