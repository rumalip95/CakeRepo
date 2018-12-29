import {LOGIN_CUSTOMER, SET_USER_TYPE} from "../actions/index"
const initialState={
    email:"",
    password:"",
    type: ""
}
export const loginReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_CUSTOMER:
            return {
                ...state,
                ...action.payload
            }

        case SET_USER_TYPE:
            return {
                ...state,
                type: action.payload
            }
        
        default: 
            return {
                ...state
            }
    }
}
