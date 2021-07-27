import axios from "axios";
import { atom } from "recoil";
 
const instance = atom({
    key : 'instance',
    default : axios.create({
        baseURL : 'http://localhost/api',
    })
});

export default instance;
