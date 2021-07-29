import axios from 'axios';
import { atom } from 'recoil';

const instance = atom({
  key: 'instance',
  default: axios.create({
    baseURL: 'http://localhost/api',
    headers: {
      'Content-Type' : 'application/json;utf-8',
      'Accept' : 'application/json'
    } 
  }),
});

export default instance;
