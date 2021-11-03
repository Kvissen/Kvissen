import {observer} from "mobx-react";

export function KvisSummary() {

    return (
        <div className={"main-container"}>
            <h1>You are done with the Kvis</h1>
        </div>
    )

}

const KvisSummaryObserver = observer(KvisSummary);
export default KvisSummaryObserver;