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
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
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
                <MenuItem onClick={handleClose}><LoginComponent/></MenuItem>
            </Menu>
        </div>
    );
}

export function LoginComponent() {
    const history = useHistory();

    // TODO: Display logout based on state of token

    return (
        <Button variant="outlined"
                onClick={
                    () => history.push("./login-redirect")
                }
                endIcon={<LoginIcon/>}>Log in </Button>
    )
}