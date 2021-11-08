import {CircularProgress, Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {useEffect, useState} from "react";
import {KvisRepository} from "../../data/repositories/KvisRepository";

export function KvisList() {

    const [isLoading, setIsLoading] = useState(true)
    const [kvisses, setKvisses] = useState<Kvis[]>([]);

    useEffect(() => {
        fetchKvisses();
    },[])

    async function fetchKvisses() {
        await setKvisses(await KvisRepository.getInstance().getKvisses())
        setIsLoading(false)
    }
       return (
        <div className="margin-container">
            {isLoading && <CircularProgress />}
            <Grid direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                {
                    kvisses.map((kvis) => {
                        return (
                            <Grid item sm={6} key={kvis.uuid}>
                                <KvisListElement kvis={kvis}/>
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