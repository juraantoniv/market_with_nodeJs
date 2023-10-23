import React, {FC} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch} from "../../store/store";
import {userActions, userThunks} from "../../store/slices";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {goodsApiService, GoodsType} from "../../services/user.service";




const Schema = z.object({
    name: z.string().min(1),
    description: z.string().min(2),
    price: z.string(),
});

export type FormType = z.infer<typeof Schema>;

const GoodsForm= () => {

    const dispatch = useAppDispatch();

    const { handleSubmit,register,  control,formState:{errors} } = useForm<FormType>({
        resolver: zodResolver(Schema),
    });

    const onSubmit = (data:FormType) => {

        goodsApiService.createGood(data).then(r => {

            dispatch(userThunks.fetchGoods())

        })
            .catch((e)=>{
                toast.warn(`${e.response.data}`)
            })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', justifyContent:'center', flexDirection:'column', width:'200px'}}>

            <input {...register("name")} />
            {errors.name && <span>This field is required</span>}
            <input {...register("description")} />
            {errors.description?.message && <span>{errors?.description?.message}</span>}
            <input {...register("price")} />
            {errors.price?.message && <span>{errors?.price?.message}</span>}
            <input type="submit" />
        </form>
    );
};

export default GoodsForm;