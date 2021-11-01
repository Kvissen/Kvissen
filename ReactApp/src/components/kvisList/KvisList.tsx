import {Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {v4 as uuidv4} from 'uuid';
import {Question} from "../../models/Question";
import {Answer} from "../../models/Answer";

export function KvisList() {

    const kvisses = [
        new Kvis(uuidv4(), "Test Kvis", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer3", false),
            ], "Test question")
        ]),
        new Kvis(uuidv4(), "Test Kvis1", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer3", false),
            ], "Test question1")
        ]),
        new Kvis(uuidv4(), "Test Kvis2", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer3", false),
            ], "Test question2")
        ])
    ]

    return (
        <div className="margin-container">
            <Grid direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                {
                    kvisses.map((kvis) => {
                        return (
                            <Grid item sm={6} key={kvis.id}>
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
export default KvisListObserver