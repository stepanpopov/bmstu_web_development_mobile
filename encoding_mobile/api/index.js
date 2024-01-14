import axios from 'axios';
import {DOMAIN} from "../consts";

export const axiosInstance = axios.create({ baseURL: `http://${DOMAIN}/api` });