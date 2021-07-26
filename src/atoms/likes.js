import { atom } from 'recoil';

// 해당 유저의 카테고리 리스트
const likes = atom({
  key: 'likes',
  default: [
    {
      id: 1,
      post_id: 1,
    },
    {
      id: 2,
      post_id: 2,
    },
  ],
});

export default likes;
