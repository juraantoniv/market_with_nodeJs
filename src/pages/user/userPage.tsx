import React, {FC, useState} from 'react';
import {Data, goodsApiService, GoodsType, userType} from "../../services/user.service";
import {ButtonComponent} from "../../components/button/buttonComponent";
import TextField from '@material-ui/core/TextField/TextField';
import {Box} from "@material-ui/core";
import {userActions, userThunks} from "../../store/slices";
import {useAppDispatch} from "../../store/store";
import {toast} from "react-toastify";



type UserTypeData = {
    setUsers?:(data:Data[])=>void
    data:Data
}
const UserPage:FC<UserTypeData> = ({
    data,
    setUsers
                               }) => {



    const [show,setShow]=useState<boolean>(true)
    const [value,setValue]=useState<string>('')
    const [id,setId]=useState<number| null| undefined>(null)

    const dispatch = useAppDispatch();

    const deleteOnclickHandler = (id:string) => {

        if (id){
           dispatch(userThunks.deleteGood({id:id})).then(()=>{
                   dispatch(userThunks.fetchGoods())
               }
           )
       }
    }

    const toShowHandler = (id:number| undefined) => {
        setId(id)
      setShow(false)
    }

    const toHideHandler = () => {
        setShow(true)
        goodsApiService.editName(id,value).then(()=>{
            goodsApiService.getAll().then((r)=>{
                // setUsers(r.data.data)
                dispatch(userThunks.fetchGoods())
            })
        })
    }

    const onBuyHandler = async (id:string ) => {

        try {

          const bought = await  goodsApiService.buyGoods(id)

            console.log(bought);

            dispatch(userThunks.fetchGoods())
            toast.info(`You have bought ${bought.data.data.name}`,{
                position:"bottom-right"
            })

            dispatch(userThunks.fetchSoldGoods())

        }

        catch (e) {
            console.log(e)
        }

    }

    const inputValueHandler = (item:string) => {
      setValue(item)
    }

    console.log(value);

    return (
        <Box style={{height:'300px', width:'200px' , border:'1px solid '}}>
            <div>{data?._id}</div>
            <img src={data?.image} style={{height:"20px",width:"30px"}}/>
            {show ?<span onDoubleClick={()=>toShowHandler(Number(data?._id))}>{data?.name}</span>:<TextField onClick={()=>setShow(false)}  value={value? value :data.name} autoFocus={true}  onBlur={toHideHandler} onChange={(event)=>inputValueHandler(event.currentTarget.value)}/> }
            <div>{data?.description}</div>
            <div>{data?.price}</div>
            <ButtonComponent disabled={!!data.boughtBy} callBack={()=>onBuyHandler(data._id)} name={'Buy'}/>
            <ButtonComponent callBack={()=>deleteOnclickHandler(data?._id)} name={'delete'}/>
        </Box>
    );
};

export default UserPage;