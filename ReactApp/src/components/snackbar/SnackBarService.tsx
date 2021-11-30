import * as React from "react";
import {GlobalSnackbar, SnackbarOptions} from "./GlobalSnackbar";
import {Snackbar} from "@mui/material";

const ConfirmationServiceContext = React.createContext<
    (options: SnackbarOptions) => Promise<void>
    >(Promise.reject);

export const useConfirmation = () =>
    React.useContext(ConfirmationServiceContext);

// @ts-ignore
export const ConfirmationServiceProvider = ({ children }) => {
    const [
        confirmationState,
        setConfirmationState
    ] = React.useState<SnackbarOptions | null>(null);

    const awaitingPromiseRef = React.useRef<{
        resolve: () => void;
        reject: () => void;
    }>();

    const openConfirmation = (options: SnackbarOptions) => {
        setConfirmationState(options);
        return new Promise<void>((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    return (
        <>
            <ConfirmationServiceContext.Provider
                value={openConfirmation}
                children={children}
            />

            <GlobalSnackbar
                open={Boolean(confirmationState)}
                variant={confirmationState?.variant!}
                message={confirmationState?.message!}
                />

        </>
    );
};
