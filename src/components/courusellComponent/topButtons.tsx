import React, {useCallback, useState} from 'react';
import IconPauseCircle from "../../svg/pause";
import IconPlayCircle from "../../svg/play";

type Buttons =  {
    callback:()=>void
}

const TopButtons = React.memo(function (props:Buttons)  {

    const [play, setPlay] = useState(true);



    const onPlayHandler = () => {
        setPlay(!play);
        props.callback()
    };

    return (
        <div onClick={onPlayHandler}>{play ? <IconPauseCircle /> : <IconPlayCircle />}</div>
    );
});

export default TopButtons;