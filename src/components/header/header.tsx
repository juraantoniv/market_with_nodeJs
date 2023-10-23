import React, {FC, useState} from 'react';
import {ButtonComponent} from "../button/buttonComponent";
import UserForm from "../userForm/userForm";
import {AxiosResponse} from "axios";
import FormSearch from "../formSearch/formSearch";
import GoodsForm from "../userForm/goodsForm";
import LogOut from "../logOutComponent/logOut";


const Header= () => {

    const [show, setShow]=useState(false)


    const create = () => {
      setShow(!show)
    }


    return (
        <div style={{width:'100%', background:'blue', height:'10vh', justifyContent:'center', alignItems:'center'}}>
            <FormSearch/>
            {!show && <ButtonComponent callBack={create} name={'Login'}/>}

            {show && <div style={{ position:'absolute', top:"600px", right:'400px'}}><UserForm/></div>}

            {show && <LogOut show={setShow} disabled={!show}/>}
        </div>
    );
};

export default Header;