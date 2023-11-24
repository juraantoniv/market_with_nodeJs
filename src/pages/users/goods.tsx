import React, {useEffect, useState} from 'react';

import UserPage from "../user/userPage";
import {Grid} from "@material-ui/core";

import {selectUsers, useAppDispatch} from "../../store/store";
import {useSelector} from "react-redux";
import {userThunks} from "../../store/slices";
import { ToastContainer } from 'react-toastify';
import {ReactSlickDemo} from "../../components/courusellComponent/caurusell";
import SelectItemsCount from "../../components/selectCountItems/selectItemsCount";
import Pagination from '@mui/material/Pagination';
import s from "./goods.module.css"
import {SideDrawer} from "../../components/sideDrawer/sideDraver";
import {FooterPage} from "../../components/footer/reactFooter";




const Goods = () => {

    const dispatch = useAppDispatch();


    const users = useSelector(selectUsers)

    console.log(users);

    const currentPage = Number(users?.page)


    let amountPages = Math.ceil(users?.itemsFound / users?.limit);


    useEffect(()=>{
        dispatch(userThunks.fetchGoods())
        dispatch(userThunks.fetchSoldGoods())
    },[dispatch])

    // const usersFunc = (data:AxiosResponse | null) => {
    //   setUsers(data?.data)
    // }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(userThunks.fetchGoods({page:value.toString(),limit:String(users?.limit)}))
    };

    const onPageChangeHandler = () => {

    }

    return (
        <div>
                <SelectItemsCount/>
            <div className={s.box}>
                <div className={s.goodsBoxWithDrawer}>
                    <SideDrawer/>

                    <Grid container spacing={4} style={{gap:'10px', marginTop:'30px', marginLeft:'50px'}}>
                        <ToastContainer />
                        {
                            users?.data?.map((user)=>(<UserPage data={user}/>))
                        }
                    </Grid>

                </div>

                <Pagination  sx={{marginTop:'30px'}} count={amountPages} page={users?.page} onChange={handleChange} variant="outlined" shape="rounded"  />

                <ReactSlickDemo/>
                <FooterPage/>
            </div>

        </div>




    );
};

export default Goods;