import axios from "axios";

import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";


export const api =
axios.create({

baseURL:
import.meta.env.VITE_API_URL,

headers:{
"Content-Type":"application/json"
}

});



api.interceptors.request.use(

(config)=>{


const token =
localStorage.getItem("token");


if(token){

config.headers.Authorization =
`Bearer ${token}`;

}


return config;

}

);



api.interceptors.response.use(

response=>response,


error=>{


if(error.response?.status===401){


toast.error(
"Session expired. Please login again."
);

const {
        logout
    } = useAuth();
logout();


return Promise.reject(error);

}



const message =

error.response?.data?.message ||

"Something went wrong";


toast.error(message);



return Promise.reject(error);


}

);