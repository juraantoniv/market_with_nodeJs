import React from 'react';
import Header from "../components/header/header";
import {Outlet} from "react-router-dom";
import PrimarySearchAppBar from "../components/appBar/app.bar";

const MainLayout = () => {

    return (
        <div>
            <PrimarySearchAppBar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;