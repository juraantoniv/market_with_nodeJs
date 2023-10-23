import React from "react";
import Slider from "react-slick";
import {useSelector} from "react-redux";
import {selectUsers} from "../../store/store";
import UserPage from "../../pages/user/userPage";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export const ReactSlickDemo =()=>{

    const users = useSelector(selectUsers)

        const settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            slidesToShow: 2,
            slidesToScroll: 1,
            // nextArrow: <NavigateNextIcon version={'NEXT'}/>,
            // prevArrow: <ArrowBackIosIcon />
        }
        return (
            <div style={{width:"70%",height:"200px",background:"violet"}}>
                <Slider {...settings}>
                    {
                        users?.data?.map((user)=> {
                            return(
                                <div>
                                    <div>{user?.name}</div>
                                    <img src={user?.image} style={{width:"20%"}}></img>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        );
    }
