import axios, {AxiosResponse} from "axios";
import {FormType} from "../components/userForm/userForm";
import {
    deleteTokens,
    getLocalAccessToken,
    getLocalRefreshToken,
    setLocalAccessToken,
    setLocalRefreshToken
} from "../functions/local.storege";
import {createBrowserHistory} from "history";

const base_url = 'http://localhost:3004'


const instance = axios.create({
    baseURL: base_url
})

const history = createBrowserHistory();
instance.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false
instance.interceptors.response.use((configs)=>{
        return configs
    },
    async (error)=>{

        const refresh =  getLocalRefreshToken()


        if(error.response?.status===401 && refresh && !isRefreshing){


            isRefreshing=true

            try {


                const tokens = await authService.refresh(refresh)

                if (tokens){

                    setLocalAccessToken(tokens.data.accessToken)
                    setLocalRefreshToken(tokens.data.refreshToken)
                }


            }catch (e){

                deleteTokens()
                // history.replace('/login?expSession=true')
            }
            isRefreshing = false;

            return  instance(error.config)
        }
        return Promise.reject(error)
    }
)

export {
    history
}



export type userType = {
    _id: number;
    name: string;
    email: string;
    avatar:string
}

export type GoodsType = {
    _id:number;
    name: string;
    description: string;
    image?:string;
    price:string;
    boughtBy?:string
}

export type CreateGood = Pick<GoodsType, 'name' | 'description' | 'price'>


export type ITokensPair = {

    tokens:{
        accessToken: string;
        refreshToken: string;
    }
    user:{
        _id: string,
        email: string,
        name: string,
        confirmedRegistration: boolean,
    }

}

export type ITokensForRefresh = {
    accessToken: string;
    refreshToken: string;
}


export type Data = {
    _id: string;
    name: string;
    description: string;
    price: string;
    image?:string;
    createdAt: string;
    updatedAt: string;
    boughtBy?: string;
}

export type Goods = {
    page: number;
    limit: number;
    itemsFound: number;
    data: Data[];
}

export type goods = {
    goods: Goods;
}


export type ParamsType = {
    page?:string,
    limit?:string,
    price?:number,
    searchName?:string
}


export const authService = {
    login: (user:FormType)=>instance.post<ITokensPair>('/auth/login',{
        ...user
    }),
    confirmPassword: (token: string | undefined, password: string, old_password: string)=>instance.post<string>('/auth/confirmPassword',{
            token,
            password,
            old_password
    }),
    refresh: (refreshToken:string)=>instance.get<ITokensForRefresh>('/auth/refresh',{
        headers:{
            Refresh:refreshToken
        }
    }),
    logout: (accessToken:string)=>instance.post<void>('/auth/logout',{
        headers:{
            Authorization:accessToken
        }
    }),
    forgot_password: (email:string)=>instance.post<void>('/auth/recoveryPassword',{
        email
    }),
    me: ()=>instance.get<userType>('/auth/me')
}





export const goodsApiService = {
    getAll: (params?:ParamsType | void)=> instance.get<Goods>(`/goods`, {
        params: {
            page: params?.page,
            limit: params?.limit,
            name:params?.searchName ,
        },
        data:{
            name:params?.searchName
        }
    }),
    getByName: (name:string) => instance.get<userType>(`/users`,{
        data:{
            name:name
        }
    }),
    deleteById: (id:string) => instance.delete<AxiosResponse, goods>(`/goods`,{
        data:{
            id
        }
    }),
    editName: (id:number | null|undefined, name:string) => instance.patch<AxiosResponse, AxiosResponse>(`/users`,{
        data:{
            id,
            name
        }
    }),
    createGood: (user:CreateGood) => instance.post<FormType, AxiosResponse>(`/goods`,{
        ...user
    }),
    buyGoods: (id:string) => instance.post<AxiosResponse<GoodsType>>(`/goods/buy`,{
        goodId:id
    }),
    getBuyGoodsByCustomer: () => instance.post<AxiosResponse<GoodsType[]>>(`/goods/getBought`),

};
