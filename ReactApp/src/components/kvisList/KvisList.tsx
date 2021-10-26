import {Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";

export function KvisList() {

    return (
        <div className="margin-container">
            <Grid direction='row' container spacing={4} justifyContent={"center"}>
                <Grid item sm={6}>
                    <KvisListElement/>
                </Grid>
                <Grid item sm={6}>
                    <KvisListElement/>
                </Grid>
                <Grid item sm={6}>
                    <KvisListElement/>
                </Grid>
                <Grid item sm={6}>
                    <KvisListElement/>
                </Grid>
            </Grid>
        </div>
    )
}

const KvisListObserver = observer(KvisList)
export default KvisListObserver