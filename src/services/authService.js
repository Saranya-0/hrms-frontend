import {commonAPI} from './commonAPI';
import { serverUrl } from './serverUrl';


export const registerAPI =async(reqBody)=>{
    return await commonAPI ('post',`${serverUrl}/api/signup`,reqBody,'');

}

export const loginAPI =async (reqBody)=>{
    return await commonAPI ('post',`${serverUrl}/api/signin`,reqBody,'');
}