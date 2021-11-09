// Erlend
import {useHistory} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from '@mui/icons-material/Person';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function DropDownMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div
            data-testid="dropdown-test-container"
        >
            <Button
                data-testid="dropdown-test-button-open"
                id="basic-button"
                variant={"contained"}
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<PersonIcon/>}
            >
                Create & Manage
            </Button>
            <Menu
                data-testid="dropdown-test-menu"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Do this</MenuItem>
                <MenuItem onClick={handleClose}>Do that</MenuItem>
                <MenuItem onClick={handleClose} data-testid="dropdown-test-menu-login"><LoginComponent/></MenuItem>
            </Menu>
        </div>
    );
}

export function LoginComponent() {
    const history = useHistory();

    // TODO: Display logout based on state of token

    return (
        <Button
            data-testid="dropdown-test-login"
            variant="outlined"
                onClick={

                    //  Normal flow: request with Kvis token succeeds

                    //  if Kvis token expired or failed receives DTU login url from server:

                    //  Redirect to DTU
                    () => history.push("/login-redirect")

                    //  Get DTU ticket?

                    //  Send DTU ticket to server

                    //  Receive Kvis token and store it

                }
                endIcon={<LoginIcon/>}>Log in </Button>
    )
}