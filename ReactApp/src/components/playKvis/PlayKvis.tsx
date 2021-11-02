import {observer} from "mobx-react";

export function PlayKvis() {

    return (
        <div className={"main-container"}>
            <h2>Test</h2>
        </div>
    )

}

const PlayKvisObserver = observer(PlayKvis)
export default PlayKvisObserver;
