import {AnyAction, combineReducers} from "redux";
import {configureStore, getDefaultMiddleware, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import {userReducer} from "./slices";
import {useDispatch} from "react-redux";





const rootReducer = combineReducers({
    users:userReducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export type AppRootStateType = ReturnType<typeof rootReducer>;


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;


export const useAppDispatch: () => AppDispatch = useDispatch;

export const selectUsers = (state: AppRootStateType) => state.users.data;
export const selectBuy = (state: AppRootStateType) => state.users.buyItems;