import {CircularProgress, Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {useEffect, useState} from "react";
import {KvisRepository} from "../../data/repositories/KvisRepository";
import jwt from "jsonwebtoken";

export function KvisList() {

    const [isLoading, setIsLoading] = useState(true)
    const [kvisses, setKvisses] = useState<Kvis[]>([]);
    const [hasNoKvisses, setHasNoKvisses] = useState(false);

    useEffect(() => {
        fetchKvisses();
    },[])

    async function fetchKvisses() {
        let userId = jwt.decode(localStorage.getItem("access_token")!) as { "user-id": string; }
        let kvisses = await KvisRepository.getInstance().getKvissesForUser(userId["user-id"])
        if (kvisses.length === 0) {
            setHasNoKvisses(true)
        } else {
            setKvisses(kvisses)
        }
        setIsLoading(false)
    }
       return (
        <div className="margin-container">
            {isLoading && <CircularProgress />}
            {
                hasNoKvisses && <h1> You have no Kvisses. Go create some</h1>
            }
            <Grid
                data-testid="kvislist-test-container"
                direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                {
                    kvisses.map((kvis) => {
                        return (
                            <Grid item sm={6} key={kvis.uuid}>
                                <KvisListElement data-testid="kvislist-test-item" kvis={kvis}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

const KvisListObserver = observer(KvisList)
export default KvisListObserver;