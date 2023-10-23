import React from 'react';
import {RangeSlider} from "../slider/slider";
import s from "./sideDrawer.module.css"

export const SideDrawer = () => {

    return (
        <div className={s.drawer}>
            <RangeSlider/>
        </div>
    );
};

