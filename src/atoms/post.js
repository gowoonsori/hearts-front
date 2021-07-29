import { atom, selector } from 'recoil';

// 해당 유저의 카테고리 리스트
export const posts = atom({
  key: 'posts',
  default: [],
});

export const likePosts = atom({
  key: 'likePosts',
  default: [],
});

export const selectPost = atom({
  key: 'selectPost',
  default: '',
})

export const editPost = selector({
  key: 'editPost',
  get: ({get}) => {
    const postList = get(posts);
    return postList.find((p)=> p.id === get(selectPost));
  }
});