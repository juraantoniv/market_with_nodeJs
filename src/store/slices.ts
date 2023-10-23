import {createSlice} from "@reduxjs/toolkit";
import {Data, Goods, goods, goodsApiService, GoodsType, ParamsType} from "../services/user.service";
import {createAppAsyncThunk} from "./create-app-thunk";
import {AppDispatch, AppRootStateType} from "./store";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {Axios, AxiosResponse} from "axios";



const initialState = {
    data:{} as Goods,
    id:'',
    buyItems:[] as GoodsType[] |[],
    page:1,
    count:5,
}

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteGood.fulfilled, (state, action) => {
                state.id = action.payload;
            })
            .addCase(returnEmpty.fulfilled, (state, action) => {
                state.data = action.payload as Goods
            })
            .addCase(fetchSoldGoods.fulfilled, (state, action) => {
                state.buyItems = action.payload.data;
            })

    },
});


const fetchGoods = createAppAsyncThunk<Goods, ParamsType |void>(
    "users/fetchUsers",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        return thunkTryCatch(thunkAPI,async ()=>{

            const goods =  await goodsApiService.getAll(arg);

            return goods.data
        })

    },
);

const fetchSoldGoods = createAppAsyncThunk<AxiosResponse<GoodsType[]>, void>(
    "users/fetchSoldGoods",
    async (_, thunkAPI) => {

        return thunkTryCatch(thunkAPI,async ()=>{

            return  await goodsApiService.getBuyGoodsByCustomer();
        })

    },
);


const returnEmpty = createAppAsyncThunk<{}, void>(
    "users/returnEmpty",
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        return thunkTryCatch(thunkAPI,async ()=>{

            return  {}
        })

    },
);



const deleteGood = createAppAsyncThunk<string, {id:string}>(
    "users/deleteUser",
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;

        return thunkTryCatch(thunkAPI,async ()=>{

            return  await goodsApiService.deleteById(arg.id);
        })

    },
);





export const userReducer = slice.reducer;
export const userActions = slice.actions;
export const userThunks = { fetchGoods ,deleteGood, returnEmpty, fetchSoldGoods};


export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>,
    logic: Function,
) => {
    const { rejectWithValue } = thunkAPI;
    try {
        return await logic();
    } catch (e) {
        return rejectWithValue(null);
    }
};