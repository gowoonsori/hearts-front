import { atom, selector } from 'recoil';

// 해당 유저의 카테고리 리스트
export const categoryList = atom({
  key: 'categoryList',
  default: [
    {
      id: 1,
      title: '샘플 카테고리1',
    },
    {
      id: 2,
      title: '샘플 카테고리2',
    },
  ],
});

export const categoryFilterValue = atom({
  key: 'categoryFilterValue',
  default: '',
});

export const categoryFilterList = selector({
  key: 'categoryFilterList',
  get: ({ get }) => {
    const filter = get(categoryFilterValue);
    const list = get(categoryList);

    return list.filter((item) => item.title.includes(filter));
  },
});
