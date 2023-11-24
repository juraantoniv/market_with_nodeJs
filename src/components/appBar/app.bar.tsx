import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ChangeEvent, useState} from "react";
import { ShoppingIcons } from '../shooppingAccontIcons/shoppingIcons';
import {ButtonComponent} from "../button/buttonComponent";
import UserForm from "../userForm/userForm";
import {TabsDemo} from "../tabs/tabsComponent";
import {ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {selectUsers, useAppDispatch} from "../../store/store";
import {userThunks} from "../../store/slices";
import s from "./app.bar.module.css"


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {

    const users = useSelector(selectUsers)
    const dispatch = useAppDispatch();


    const [show, setShow]=useState(false)
    const [value, setValue]=useState<string>('')

    const searchHandler = (e:string) => {

        setValue(e)

        dispatch(userThunks.fetchGoods({searchName:e}))
    }


    const create = () => {
        setShow(!show)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ToastContainer />
            {show && <div style={{ position:'absolute', top:"100px", right:'400px'}}><TabsDemo/></div>}
    <AppBar position="static" className={s.header} >
    <Toolbar>
    <Search >
    <SearchIconWrapper>
        <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
    value={value}
    onChange={(event)=>searchHandler(event.currentTarget.value)}
    placeholder="Search…"
    inputProps={{ 'aria-label': 'search' }}
    />
    </Search>
    <Box sx={{ flexGrow: 1 }} />
        {users?.data?.length ? <ShoppingIcons/>:<ButtonComponent callBack={create} name={'Login'}/>}
        </Toolbar>
        </AppBar>
    </Box>
);
}