import * as types from "./actionTypes";

const initialState = {
    admin:false,
  employees: [],
  isLoading: false,
  isError: false,
  isAuth:false
};

export const reducer = (state = initialState,action) => {
    const {type,payload} =action;

    switch(type){
        case types.GET_EMPLOYEE_DATA_REQUEST:
            return{
                ...state,isLoading:true,isError:false
            }
        case types.GET_EMPLOYEE_DATA_SUCCESS:
            return{
                ...state,isLoading:false,isError:false,employees:payload
            }
        case types.GET_EMPLOYEE_DATA_FAILURE:
                return{
                    ...state,isLoading:false,isError:true
                }

        case types.ADD_EMPLOYEE_DATA_REQUEST:
            return{
                ...state,isLoading:true,isError:false,isAuth:true,admin:true
            }
        case types.ADD_EMPLOYEE_DATA_SUCCESS:
            return{
                ...state,isLoading:false,isAuth:true,isError:false,admin:true
            }
        case types.ADD_EMPLOYEE_DATA_FAILURE:
            return{
                ...state,isLoading:false,isError:true,isAuth:false,admin:false
            }

        case types.EDIT_EMPLOYEE_DATA_REQUEST:
            return{
                ...state,isLoading:true,isError:true,isAuth:true,admin:true
            }
        case types.EDIT_EMPLOYEE_DATA_SUCCESS:
            return{
                ...state,isLoading:false,isError:false,isAuth:true,employees:payload
            }
        case types.EDIT_EMPLOYEE_DATA_FAILURE:
            return{
                ...state,isLoading:false,isError:true,isAuth:false,admin:false
            }
            default:
                return state;
    }
}