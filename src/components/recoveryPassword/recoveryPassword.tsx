import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import "../tabs/styles.css"
import * as Tabs from '@radix-ui/react-tabs';
import {authService} from "../../services/user.service";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Schema = z.object({
    email: z.string().email({message:'Email is not valid'}),
});

export type FormType = z.infer<typeof Schema>;

const RecoveryPassword = () => {

    const { handleSubmit,register,formState:{errors} } = useForm<FormType>({
        resolver: zodResolver(Schema),
    });

    const onSubmit = async (data:FormType) => {

        try {

        await authService.forgot_password(data.email)
        }
        catch (e:any) {

            toast.warn(`${e.response.data}`)
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
                                    Email
                                </label>
                                <input {...register("email")} className="Input" id="name" defaultValue="Pedro Duarte" />
                                {errors.email?.message && <span>{errors?.email?.message}</span>}
                            </fieldset>
                            <button className="Button green">Recovery</button>
                        </form>
                    </Tabs.Content>
                </Tabs.Root>
            </>
    );
};

export default RecoveryPassword;