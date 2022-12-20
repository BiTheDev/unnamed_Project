import * as userActionTypes from '../Constants/UserConstants.js';

const userReducer = (state = { authData: null,userDetail:null }, action) =>{
    switch (action.type){
        case userActionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action.data };
        case userActionTypes.LOGOUT:
        case userActionTypes.DELETE_USER:
            localStorage.clear();
            return { ...state, authData: null};
        // case userActionTypes.DELETE_USER:
        case userActionTypes.FETCH_USER_DETAILS:
            console.log(action.data);
            return{...state, userDetail:action.data.result}
        case userActionTypes.UPDATE_USER:
            console.log(action.data);
            return{...state, userDetail:action.data.result}
        default:
            return state;

    }
}

export default userReducer;