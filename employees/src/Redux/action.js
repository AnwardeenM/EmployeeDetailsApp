
import * as types from "./actionTypes";
import axios from "axios";


const getEmployeeDetailsRequest=()=>{
    return{type:types.GET_EMPLOYEE_DATA_REQUEST}
}
const getEmployeeDetailsSuccess=(payload)=>{
    return{type:types.GET_EMPLOYEE_DATA_SUCCESS,payload}
}
const getEmployeeDetailsFailure=()=>{
    return{type:types.GET_EMPLOYEE_DATA_FAILURE}
}


const getEmployees=()=>(dispatch)=>{
    dispatch(getEmployeeDetailsRequest())
    return axios.get("https://empdet-teric.herokuapp.com/employees")
    .then((res)=>dispatch(getEmployeeDetailsSuccess(res.data)))
    .then((err)=>dispatch(getEmployeeDetailsFailure(err)));
}

const addEmployeeDetailsRequest=()=>{
    return{type:types.ADD_EMPLOYEE_DATA_REQUEST};
}

const addEmployeeDetailsSuccess=(payload)=>{
    return{type:types.ADD_EMPLOYEE_DATA_SUCCESS,payload};
}
const addEmployeeDetailsFailure=()=>{
    return{type:types.ADD_EMPLOYEE_DATA_FAILURE};
}

const addEmployee=(payload)=>(dispatch)=>{
    dispatch(addEmployeeDetailsRequest())
    return axios.post("https://empdet-teric.herokuapp.com/employees",payload)
    .then((res)=>{
        dispatch(addEmployeeDetailsSuccess(res.data));
        getEmployees();
    })
    .then((err)=>dispatch(addEmployeeDetailsFailure(err)))
    
}

const editEmployeeDetailsRequest=()=>{
    return{type:types.EDIT_EMPLOYEE_DATA_REQUEST}
}
const editEmployeeDetailsSuccess=(payload)=>{
    return{type:types.EDIT_EMPLOYEE_DATA_SUCCESS,payload}
}
const editEmployeeDetailsFailure=()=>{
    return{type:types.EDIT_EMPLOYEE_DATA_FAILURE}
}

const editEmployee=(id,payload)=>(dispatch)=>{
    dispatch(editEmployeeDetailsRequest())
    return axios.patch(`https://empdet-teric.herokuapp.com/employees/${id}`,payload)
    .then((res)=>{
        dispatch(editEmployeeDetailsSuccess(res.data))
        getEmployees();
    })
    .then((err)=>dispatch(editEmployeeDetailsFailure(err)))
}

export {getEmployees,addEmployee,editEmployee}