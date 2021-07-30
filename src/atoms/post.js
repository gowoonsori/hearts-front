import { atom, selector } from 'recoil';

export const posts = atom({
  key: 'posts',
  default: [],
});

export const selectPost = atom({
  key: 'selectPost',
  default: '',
});

export const editPost = selector({
  key: 'editPost',
  get: ({get}) => {
    const postList = get(posts);
    return postList.find((p)=> p.id === get(selectPost));
  }
});