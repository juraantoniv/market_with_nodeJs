import React, {useEffect} from 'react';

import './styles.css';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useSelector} from "react-redux";
import {selectBuy} from "../store/store";
import Badge from "@mui/material/Badge";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import {userThunks} from "../store/slices";



const DropdownMenuDemo = () => {

    const users = useSelector(selectBuy)



    return (
        <DropdownMenu.Root>

                    <Badge badgeContent={users?.length} color={'info'} >
            <DropdownMenu.Trigger asChild>

                <button className="IconButton" aria-label="Customise options">
                        <ShoppingCartIcon />
                </button>
            </DropdownMenu.Trigger>
                 </Badge>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
                    {
                        users.map((user)=>(
                             <DropdownMenu.Item className="DropdownMenuItem">
                            <div>{user?.name} <ShoppingBagIcon/></div>
                             </DropdownMenu.Item>
                        ))
                    }
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuDemo;