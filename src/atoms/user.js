import { atom } from 'recoil';

// 해당 유저의 카테고리 리스트
const user = atom({
  key: 'user',
  default: {
    id: 1,
    name: '홍길동',
  },
});

export default user;
