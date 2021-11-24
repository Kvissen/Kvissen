// Erlend
import {useHistory} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from '@mui/icons-material/Person';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import jwt from "jsonwebtoken";

export default function DropDownMenu() {
    const history = useHistory()
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
                {isLoggedInAs("creator") ?
                    <MenuItem onClick={handleClose}>
                        <Button
                            variant="outlined"
                            onClick={
                                () => {
                                    history.push("/landing")
                                }
                            }
                        >View & Edit</Button>
                    </MenuItem> : null
                }
                {isLoggedInAs("creator") ?
                    <MenuItem onClick={handleClose}>
                        <LogoutComponent/></MenuItem> : null
                }
                {!isLoggedInAs("creator") ?
                    <MenuItem onClick={handleClose} data-testid="dropdown-test-menu-login">
                        <LoginComponent/></MenuItem> : null
                }
            </Menu>
        </div>
    );
}

function isLoggedInAs(role: string) {

    // Check null
    const token = localStorage.getItem("access_token")
    if (token === null || token === undefined || token === "null") return false

    // Check faulty or expired
    const decodedToken = jwt.decode(token, {complete: true})
    if (decodedToken === undefined || decodedToken === null) return false

    // if (decodedToken.payload.exp!! < new Date().getTime()) return false

    // Check wrong scope
    const {scope} = jwt.decode(token) as { scope: string; };
    return scope === role;
}

export function LoginComponent() {
    const history = useHistory();

    return (
        <Button
            data-testid="dropdown-test-login"
            variant="outlined"
            onClick={
                () => history.push("/login-redirect")
            }
            endIcon={<LoginIcon/>}>Log in </Button>
    )
}

export function LogoutComponent() {
    const history = useHistory();
    return (
        <Button
            variant="outlined"
            onClick={
                () => {
                    history.replace("/")
                    localStorage.setItem("access_token", "null")
                }
            }
            endIcon={<LoginIcon/>}>Log out</Button>
    )
}