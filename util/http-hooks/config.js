import axios from "axios";
import { string } from "../constants";


export const axiosConfig = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL
})