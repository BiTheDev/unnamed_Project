import * as userActionTypes from '../Constants/UserConstants.js';

const userReducer = (state = { authData: null }, action) =>{
    switch (action.type){
        case userActionTypes.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action.data };
        case userActionTypes.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null};
        // case userActionTypes.DELETE_USER:
        default:
            return state;

    }
}

export default userReducer;