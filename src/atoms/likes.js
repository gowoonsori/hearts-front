import { atom } from 'recoil';

// 해당 유저의 카테고리 리스트
const likes = atom({
  key: 'likes',
  default : [-1],
});

export default likes;
