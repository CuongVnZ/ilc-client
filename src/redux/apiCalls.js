import { publicRequest, updateToken } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        console.log(user)
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
        updateToken()
    }catch(err){
        console.log(err)
        dispatch(loginFailure());
    }
}