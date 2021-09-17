import { atom, selector } from 'recoil';
import instance from './axios';

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
    const editPostId = get(selectPost);
    if(editPostId === '') return false;

    const res = get(instance).get(`/user/post/${editPostId}`)
      .then(res => {
        return res.data.response;
      })
      .catch(error =>{
        return false;
      });
    return res;
  }
});