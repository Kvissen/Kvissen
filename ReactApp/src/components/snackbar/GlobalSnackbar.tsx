import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

export interface SnackbarOptions {
    variant: "danger" | "success";
    message: string;
}

interface SnackbarProps extends SnackbarOptions {
    open: boolean;
}

export const GlobalSnackbar: React.FC<SnackbarProps> = ({
           open,
           variant,
            message
       }) => {
    return (
        <div></div>
        /*
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {variant === "danger" && (
                    <>
                        <Button color="primary" onClick={onSubmit}>
                            Yes, I agree
                        </Button>
                        <Button color="primary" onClick={onClose} autoFocus>
                            CANCEL
                        </Button>
                    </>
                )}

                {variant === "success" && (
                    <Button color="primary" onClick={onSubmit}>
                        OK
                    </Button>
                )}
            </DialogActions>
        </Dialog>

         */
    );
};
