import React, {useState, useEffect, useCallback} from "react";
import Slider from "react-slick";
import IconPauseCircle from "../../svg/pause";
import IconPlayCircle from "../../svg/play";
import {useSelector} from "react-redux";
import {selectUsers} from "../../store/store";
import TopButtons from "./topButtons";
// other imports...


type ReactSlickProps ={
    callback?:()=>void
}



export const ReactSlickDemo = React.memo((props:ReactSlickProps) => {
    const users = useSelector(selectUsers);
    const [play, setPlay] = useState(true);


    const settings = {
        dots: true,
        infinite: true,
        autoplay: play,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: true,
    };

    const onChangeHandler = () => {

    }


    console.log("ReactSlickDemo")


    const onPlayHandler = (item:boolean) => {
      setPlay(item)
    }

    return (
        <div style={{ width: "70%", height: "200px", background: "violet" }}>
                <Slider key="slider-on" {...settings}>
                    {users?.data?.map((user) => (
                        <div key={user?.name}>
                            <div>{user?.name}</div>
                            <img src={user?.image} style={{ width: "20%" }} alt={user.name} />
                        </div>
                    ))}
                </Slider>
        </div>
    );
});
