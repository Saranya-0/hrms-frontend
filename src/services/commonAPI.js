import axios from 'axios'



export const commonAPI=async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url:url,
        data:reqBody,
        headers:reqHeader?reqHeader:{
            "Content-Type":"application/json"
        }
    }
    try {
        const response = await axios(reqConfig);
        return response;
      } catch (error) {
        throw error; // <-- Important: so you can catch it in your component
      }
    };
