import * as UserActionTypes from '../Constants/UserConstants.js';
import * as UserAPI from '../API/UserAPI.js';

export const login = (formData, navigate)=> async (dispatch) =>{
    try {
        const { data } = await UserAPI.login(formData);
        console.log(formData);
        dispatch({type: UserActionTypes.AUTH, data});
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const register = (formData, navigate)=> async (dispatch)=>{
    console.log(formData);
    try {
        const { data } = await UserAPI.register(formData);
        dispatch({type: UserActionTypes.AUTH, data});
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (id) => async(dispatch)=>{
    try {
        await UserAPI.deleteUser(id);

        dispatch({type:UserActionTypes.DELETE_USER,payload:id});
    } catch (error) {
        console.log(error);
    }
}