import {observer} from "mobx-react";
import {store} from "../../stores/KvisStore";
import ScorePieChart from "./ScorePieChart";

export function KvisSummary() {

    // Submit results to the database
    store.submitResults()

    return (
        <div className={"main-container"}>
            <h1 data-testid="summary-test-h1">You have conquered this Kvis!</h1>
            <article>{listResultsSummary()}</article>
            <article>{listResultsRaw()}</article>
            <ScorePieChart width={300} height={300}
                           top={10} right={10} bottom={10} left={10}
                           resultData={getResultChartData()}/>
        </div>
    )
}

// Shows the validity of answers as a list
function listResultsRaw() {
    return (<ol>
            {store.result.answerResults.map((result) => (
                <li>{result ? "Correct" : "Wrong"}</li>
            ))}
        </ol>
    )
}

// Shows percentage of right answers
function listResultsSummary() {
    return (
        <h2>Result: {getResultChartData()[0].value * 100 / store.result.answerResults.length}%</h2>
    )
}

// Returns right and wrong answers, formatted for the pie chart
function getResultChartData() {
    return [
        {
            label: "Correct",
            value: store.result.answerResults.filter(result => result).length
        },
        {
            label: "Wrong",
            value: store.result.answerResults.filter(result => !result).length
        }
    ]
}

const KvisSummaryObserver = observer(KvisSummary);
export default KvisSummaryObserver;