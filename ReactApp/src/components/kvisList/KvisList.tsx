import {CircularProgress, Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {useEffect, useState} from "react";
import {KvisRepository} from "../../data/repositories/KvisRepository";
import jwt from "jsonwebtoken";
import {KvisActivate} from "../../models/KvisActivate";

export function KvisList() {

    const [isLoading, setIsLoading] = useState(true)
    const [kvisses, setKvisses] = useState<Kvis[]>([]);
    const [hasNoKvisses, setHasNoKvisses] = useState(false);
    const [activatedKvisses, setActivatedKvisses] = useState<KvisActivate[]>([])

    useEffect(() => {
        fetchKvisses();
    },[])

    async function fetchKvisses() {
        let userId = jwt.decode(localStorage.getItem("access_token")!) as { "user_id": string; }
        if (userId === null) {
            return
        }
        let kvisActivates = await KvisRepository.getInstance().getActivatedKvisses();
        let kvisses = await KvisRepository.getInstance().getKvissesForUser(userId.user_id)
        if (kvisses.length === 0) {
            setHasNoKvisses(true)
        } else {
            setKvisses(kvisses)
        }
        setActivatedKvisses(kvisActivates)
        setIsLoading(false)
    }

    function isActivated(kvis : Kvis) : boolean {
       if (activatedKvisses.length > 0) return activatedKvisses.find(entity => entity.kvisId === kvis.uuid) !== undefined
       else return false;
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
                                <KvisListElement data-testid="kvislist-test-item" kvis={kvis} isActivated={isActivated(kvis)}/>
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