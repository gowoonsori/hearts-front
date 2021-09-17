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
    
    const res = await get(instance).get('/user').catch((error) => {
      return error.response;
    });
    return res?.data;
  },
  set: ({ set }, userInfo) => {
    set(user, userInfo);
  }
});