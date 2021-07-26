import { atom } from 'recoil';

// 해당 유저의 카테고리 리스트
export const tagList = atom({
  key: 'tagList',
  default: ['사람', '말'],
});
