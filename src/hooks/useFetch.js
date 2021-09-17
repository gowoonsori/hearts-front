// useFetch.js
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { posts } from "../atoms/post";
import { alertState } from "../atoms/alert";
import instance from '../atoms/axios';

function useFetch(lastId) {
  const axios = useRecoilValue(instance);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [postList, setPostList] = useRecoilState(posts);
  const [hasMore, setHasMore] = useState(false);
  const [openAlert, setOpenAlert] = useRecoilState(alertState);

    const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`/user/post?lastId=${lastId}`)
      .catch(e => {
        if (e.response) setOpenAlert({state : true, message : e.message, severity : 'error' });
        else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
      });

      if(res.data.success){
        const newList = postList.slice(0,postList.length);
        newList.concat(res.data.response);
        await setPostList(newList);

        await setHasMore(res.data.docs.length > 0);
        setLoading(false);
      }
      
    } catch (err) {
      setError(err);
    }
  }, [lastId]);

  useEffect(() => {
    sendQuery(lastId);
  }, [lastId]);

  return { loading, error, posts, hasMore };
}

export default useFetch;