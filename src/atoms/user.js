import { atom, selector } from 'recoil';
import instance from './axios';

// 해당 유저의 카테고리 리스트
export const user = atom({
  key: 'user',
  default: {},
});

export const userSelector = selector({
  key: 'userSelector',
  get: async ({ get }) => {
    if (get(user).id) return get(user);
    
    const res = await get(instance).get('/user').catch((e) => {
      return '잘못된 요청입니다.';
    });
    if(typeof(res)==='string')return res;
    else if(res.data.success) return res.data.response;
    else return res.data.response.message;
  },
  set: ({ set }, userInfo) => {
    set(user, userInfo);
  }
});