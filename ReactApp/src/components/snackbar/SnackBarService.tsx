import * as React from "react";
import {GlobalSnackbar, SnackbarOptions} from "./GlobalSnackbar";

const SnackbarServiceContext = React.createContext<
    (options: SnackbarOptions) => Promise<void>
    >(Promise.reject);

export const useSnackbar = () =>
    React.useContext(SnackbarServiceContext);

// @ts-ignore
export const SnackbarServiceProvider = ({ children }) => {
    const [
        snackbarState,
        setSnackbarState
    ] = React.useState<SnackbarOptions | null>(null);

    const awaitingPromiseRef = React.useRef<{
        resolve: () => void;
        reject: () => void;
    }>();

    const handleClose = () => {
        setSnackbarState(null);
    };

    const openSnackbar = (options: SnackbarOptions) => {
        setSnackbarState(options);
        return new Promise<void>((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    return (
        <>
            <SnackbarServiceContext.Provider
                value={openSnackbar}
                children={children}
            />

            <GlobalSnackbar
                open={Boolean(snackbarState)}
                severity={snackbarState?.severity!}
                message={snackbarState?.message!}
                onClose={handleClose}
                />

        </>
    );
};
