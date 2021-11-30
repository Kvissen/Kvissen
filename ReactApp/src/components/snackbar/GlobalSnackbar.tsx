import * as React from "react";
import {Alert, Snackbar} from "@mui/material";

export interface SnackbarOptions {
    severity: "error" | "success" | "info" | "warning";
    message: string;
}

interface SnackbarProps extends SnackbarOptions {
    open: boolean;
    onClose: () => void;
}

export const GlobalSnackbar: React.FC<SnackbarProps>
    = ({
           open,
           severity,
           message,
           onClose
       }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            onClose={onClose}>
            <Alert sx={{width: '100%'}} severity={severity} variant={"filled"}>
                {message}
            </Alert>
        </Snackbar>
    );
};
