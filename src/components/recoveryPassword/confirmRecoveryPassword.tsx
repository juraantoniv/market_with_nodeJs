import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import "../tabs/styles.css"
import * as Tabs from '@radix-ui/react-tabs';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from "react-router-dom";
import {authService} from "../../services/user.service";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const recoveryPasswordSchema = z
    .object({
        old_password: z.string(),
        password: z.string().min(4),
        confirmPassword: z.string().min(4),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                message: "Passwords do not match",
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
            });
        }

        return data;
    });

export type FormType = z.infer<typeof recoveryPasswordSchema>;

export const ConfirmRecoveryPassword = () => {

    const {token}=useParams<string>()

    console.log(token);

    const { handleSubmit,register,formState:{errors} } = useForm<FormType>({
        resolver: zodResolver(recoveryPasswordSchema),
        mode: "onBlur",
        defaultValues: {
            old_password: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data:FormType) => {

       try {
           const res = await authService.confirmPassword(token,data.password,data.old_password)

           console.log(res);

           toast.info(`${res.data}`)
       }

       catch (e) {

           console.log(e);
       }
    }

    return (
        <>
            <Tabs.Root className="TabsRoot" defaultValue="tab1">
                <Tabs.Content className="TabsContent" value="tab1">
                    <p className="Text">Make changes to your account here. Click save when you're done.</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="name">
                                Old Password
                            </label>
                            <input {...register("old_password")} className="Input" id="name" defaultValue="Pedro Duarte" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="name">
                                Old Password
                            </label>
                            <input {...register("password")} className="Input" id="name" defaultValue="Pedro Duarte" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="name">
                                Old Password
                            </label>
                            <input {...register("confirmPassword")} className="Input" id="name" defaultValue="Pedro Duarte" />
                        </fieldset>
                        {errors && <p>{errors.confirmPassword?.message}</p>}
                        <button className="Button green">Recovery</button>
                    </form>
                </Tabs.Content>
            </Tabs.Root>
        </>
    );
};
