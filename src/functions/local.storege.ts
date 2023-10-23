
export const getLocalAccessToken=()=> {
    const accessToken = window.localStorage.getItem("accessToken");
    return accessToken;
}

export const getLocalRefreshToken =()=> {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken;
}

export const setLocalAccessToken= (token:string)=> {
   localStorage.setItem("accessToken", token);
}

export const setLocalRefreshToken = (token:string)=> {
     localStorage.setItem("refreshToken",token);

}

export const deleteTokens = ()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
}