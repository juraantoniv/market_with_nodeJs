import React, {FC} from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch} from "../../store/store";
import {userActions, userThunks} from "../../store/slices";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {authService, goodsApiService} from "../../services/user.service";
import {setLocalAccessToken, setLocalRefreshToken} from "../../functions/local.storege";




const Schema = z.object({
    password: z.string().min(1),
    email: z.string().email({message:'error'}),
});

export type FormType = z.infer<typeof Schema>;

const UserForm= () => {

    const dispatch = useAppDispatch();

    const { handleSubmit,register,  control,formState:{errors} } = useForm<FormType>({
        resolver: zodResolver(Schema),
    });

    const onSubmit = (data:FormType) => {

        authService.login(data).then(r => {

            console.log(r.data);

            setLocalAccessToken(r.data.tokens.accessToken)
            setLocalRefreshToken(r.data.tokens.refreshToken)

            dispatch(userThunks.fetchGoods())

        })
            .catch((e)=>{
                toast.warn(`${e.response.data}`)
            })
    }
    return (
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex', justifyContent:'center', flexDirection:'column', width:'200px'}}>


                <input {...register("email")} />
                {errors.email?.message && <span>{errors?.email?.message}</span>}
                <input {...register("password")} />
                {errors.password && <span>This field is required</span>}
                <button>Login</button>
            </form>
    );
};

export default UserForm;