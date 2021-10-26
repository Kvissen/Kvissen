import {Grid} from "@mui/material";
import {observer} from "mobx-react";

export function KvisList() {

    return (
        <div className="margin-container">
            <Grid>
                <h1>
                    Kvis List
                </h1>
            </Grid>
        </div>
    )
}
const KvisListObserver = observer(KvisList)
export default KvisListObserver