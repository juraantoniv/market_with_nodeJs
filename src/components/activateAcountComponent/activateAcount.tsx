import React from 'react';
import {useParams} from "react-router-dom";
import {Button} from "@material-ui/core";
import {authService} from "../../services/user.service";

export const ActivateAccount = () => {

    const {token}=useParams<string>()

    console.log(token);

    const activateAccountHandler = async () => {
        
        try {
            if (token){
                // await authService.confirm(token)

            }
        }
        catch (e) {
            console.log(e);
        }
    }
       

    return (
        <div>

            <Button onClick={activateAccountHandler} style={{position:"absolute", right:"100px"}}>Activate</Button>
        </div>
    );
};

