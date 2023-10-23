import React, {useEffect, useState} from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import './styles.css';
import {authService} from "../../services/user.service";

export const AvatarProfile = () => {


    const [avatar,setAvatar]= useState<string>()


    useEffect(  ()=>{

        authService.me().then((me)=>{

           setAvatar(me.data.avatar)
        })

    },[])


    return(
        <div style={{ display: 'flex', gap: 20 }}>
            <Avatar.Root className="AvatarRoot">
                <Avatar.Image
                    className="AvatarImage"
                    src={avatar}
                    alt="Colm Tuite"
                />
                <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                    CT
                </Avatar.Fallback>
            </Avatar.Root>
        </div>
    );
}






