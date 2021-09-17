import { atom } from "recoil";

export const dialogState = atom({
    key : 'dialogState',
    default : {state : false},
});

export const alertState = atom({
    key : 'alertState',
    default : {
        state: false,
        message: '',
        severity: 'error'
      },
})