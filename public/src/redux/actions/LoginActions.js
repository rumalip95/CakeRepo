import {LOGIN_CUSTOMER, SET_USER_TYPE} from "./index"


export const loginCustomer=(data)=>{    
    return{type:LOGIN_CUSTOMER, payload:data}
}

export const setType = (isProvider) => {
    return {type: SET_USER_TYPE, payload: isProvider? "serviceProvider" : "customer"}
}