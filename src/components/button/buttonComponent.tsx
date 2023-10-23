import React, {FC} from 'react';
import { Button } from '@material-ui/core';


type ButtonProps = {
    callBack:()=>void
    name:string
    disabled?:boolean
}

export const ButtonComponent:FC<ButtonProps> = ({
    name,
    callBack,
    disabled
                                    }) => {

    const onClickHandler = () => {
      callBack()
    }

    return (
        <div>
            <Button variant={'contained'} disabled={disabled} onClick={onClickHandler} style={{background:'bue'}}>{name}</Button>
        </div>
    );
};

