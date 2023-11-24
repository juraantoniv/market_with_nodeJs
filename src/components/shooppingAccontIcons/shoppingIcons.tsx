import React from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from "@mui/icons-material/Mail";
import {authService} from "../../services/user.service";
import {getLocalAccessToken, getLocalRefreshToken} from "../../functions/local.storege";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {selectBuy, selectUsers} from "../../store/store";
import DropdownMenuDemo from "../../dropdownMenu/Dropdown Menu";
import {AvatarProfile} from "../avatar/avatar";
import {useNavigate} from "react-router-dom";
import s from "./shoppingIcons.module.css"

export const ShoppingIcons = () => {

    const users = useSelector(selectBuy)

   const navigate = useNavigate()

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);

    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
        navigate("myProfile")

    };

    const LogOut =async () => {
        try {
            const access =  getLocalAccessToken()
            const res = await authService.logout(access!!)

            toast.info(`${res.data}`)
        }
        catch (e) {

        }
        setAnchorEl(null);
        handleMobileMenuClose();
    }
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';


    const renderMenu = (
        <Menu
            style={{marginTop:"40px"}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={LogOut}>LogOut</MenuItem>
        </Menu>
    );
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={users?.length} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );


    return (
        <div className={s.headerIcons}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }} }>
              <DropdownMenuDemo/>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AvatarProfile/>
                </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </Box>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
};
