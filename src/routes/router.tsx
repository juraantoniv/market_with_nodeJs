import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Goods from "../pages/users/goods";
import {ActivateAccount} from "../components/activateAcountComponent/activateAcount";
import RecoveryPassword from "../components/recoveryPassword/recoveryPassword";
import {ConfirmRecoveryPassword} from "../components/recoveryPassword/confirmRecoveryPassword";
import GoodsForm from "../components/userForm/goodsForm";
import {ProfileComponent} from "../components/profile/profileComponent";




const privateRoutes: RouteObject[] = [
    {
        path: "",
        element: <Goods />,
    },
    {
        path: "activate/:token",
        element: <ActivateAccount />,
    },
    {
        path: "forgotYourPassword",
        element: <RecoveryPassword/>,
    },
    {
        path: "forgotWithToken/:token",
        element: <ConfirmRecoveryPassword/>,
    },
    {
        path: "create",
        element: <GoodsForm/>,
    },
    {
        path: "myProfile",
        element: <ProfileComponent/>,
    }

];

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: privateRoutes,
    },
]);


export const Router = () => {
    return <RouterProvider router={router} />;
};