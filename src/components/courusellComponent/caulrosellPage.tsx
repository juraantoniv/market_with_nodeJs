import React from 'react';
import TopButtons from "./topButtons";
import {ReactSlickDemo} from "./caurusell";

export const CaurusellPage = () => {

    const onChangeHandler = () => {

    }

    return (
        <>
            <TopButtons callback={onChangeHandler}/>
            <ReactSlickDemo/>
        </>
    );
};

