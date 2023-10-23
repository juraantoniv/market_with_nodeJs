import React, {useEffect, useState} from 'react';
import {goodsApiService} from "../../services/user.service";

const FormSearch = () => {


    const [name,setName]=useState<string>('')

    useEffect(()=>{

        goodsApiService.getByName(name).then(r => {
            console.log(r);
        }).catch( e =>{

            console.log(e);
        })

    },[name])

    return (
        <div>
            <input value={name} type={'text'} onChange={(event)=>setName(event.currentTarget.value)}/>
        </div>
    );
};

export default FormSearch;