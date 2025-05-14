import { commonAPI } from "./commonAPI";
import { serverUrl } from "./serverUrl";

// CREATE employee

export const createEmployeeAPI =async (reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/create`,reqBody,'');

};

export const getAllEmployeesAPI = async () => {
  return await commonAPI('get', `${serverUrl}/api/get`, '', '');
};


export const updateEmployeeAPI = async (id, data) => {
  return await commonAPI('put', `${serverUrl}/api/employee/${id}`, data, '');
};


export const deleteEmployeeAPI = async (id) => {
  return await commonAPI('delete', `${serverUrl}/api/employee/${id}`);
};




