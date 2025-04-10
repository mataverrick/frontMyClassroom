import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api/auth/career";

export const getCarreras = async ()=>{
    const token = localStorage.getItem('token');

    if(!token){
        throw new Error("Token no disponible");
    }

    const response =  await axios.get(endpoint,{headers: { Authorization: `Bearer ${token}` }});
    
    // console.log(response.data)

    return response.data;
}