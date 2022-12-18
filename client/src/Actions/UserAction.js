import * as UserActionTypes from '../Constants/UserConstants.js';
import * as UserAPI from '../API/UserAPI.js';

export const login = (formData, history)=> async (dispatch) =>{
    try {
        const { data } = await UserAPI.login(formData);
        dispatch({type: UserActionTypes.AUTH, data});
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const register = (formData, history)=> async (dispatch)=>{
    try {
        const { data } = await UserAPI.register(formData);

        dispatch({type: UserActionTypes.AUTH, data});
        history.push('/');
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