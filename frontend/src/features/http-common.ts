import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import { Token } from "./auth/authApi";



const headers = () => {

    const token:Token = JSON.parse(localStorage.getItem('token') || '{}')
    let header = null
    if (token) {
        header = {
            baseURL:BASE_URL,
            headers:{
                'Authorization':`Bearer ${token.access}`,
                // 'Content-Type':'application/json',
                'Accept':'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }
    } else {
        header = {
            baseURL:BASE_URL,
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
    }
    return header
}

export default  axios.create(headers())