import React, {FC} from 'react';
import {ButtonComponent} from "../button/buttonComponent";
import {getLocalAccessToken} from "../../functions/local.storege";
import {authService} from "../../services/user.service";
import {useAppDispatch} from "../../store/store";
import {userThunks} from "../../store/slices";

type LogOut = {
    show?:(r:boolean)=>void
    disabled?:boolean
}

const LogOut:FC<LogOut> = ({
    show,
    disabled
                           }) => {


    const dispatch = useAppDispatch();

    const logOut = async () => {
        const accessToken = getLocalAccessToken()

        try {
            if (accessToken){

                await authService.logout(accessToken)
                dispatch(userThunks.returnEmpty())

                if (show) {
                    show(false)
                }

            }

        }

        catch (e) {

        }
    }

    return (
        <>
            <ButtonComponent callBack={logOut} name={'LogOut'} disabled={disabled}/>
        </>
    );
};

export default LogOut;