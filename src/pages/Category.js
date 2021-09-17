import { Container } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { alertState } from "../atoms/alert";
import instance from "../atoms/axios";
import {  posts } from "../atoms/post";
import { user } from "../atoms/user";
import PostList from "../components/lists/PostList";
import Auth from "../hoc/auth";
import useScrollReset from "../hooks/useScrollReset";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Category = () => {
    let query = useQuery();
    const categoryId = query.get("id");
    const axios = useRecoilValue(instance);
    const userInfo = useRecoilValue(user);
    const [postList,setPostList] = useRecoilState(posts);
    const setOpenAlert = useSetRecoilState(alertState);
    const [hasMore,setHasMore] = useState(true);
    const scrollToTop = useScrollReset;
    const navigate = useNavigate();

    useEffect(()=>{
      setPostList([]);
        if(!userInfo?.id) return;
        scrollToTop();
        axios.get(`/user/post/category/${categoryId}?lastId=0`)
        .then(res=>{
            if (res?.data?.success) {
                if(res.data.response.length === 0) setHasMore(false);
                setPostList(res.data.response);
            }
        })
        .catch(error => {
          if (error.response) {
            setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
            if(error.response.data.response.status === 401 ){
              navigate('/login', { replace: true });
              return;
            }
            else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
          }
          else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
        });
    },[axios,setOpenAlert,scrollToTop,setPostList,navigate,categoryId,setHasMore,userInfo]);
    
    const fetchMoreData = useCallback(() => {
        const lastId = postList[postList.length-1]?.id ?? 0;
        axios.get(`/user/post/category/${categoryId}?lastId=${lastId}`)
        .then(res => {
          if(res.data.success){
            if(res.data.response.length === 0) setHasMore(false);
            const newList = postList.slice(0,postList.length);
            newList.push(...res.data.response);
            setPostList(newList);
          }
        })
        .catch(error => {
          if (error.response) {
            setOpenAlert({state : true, message : error.response.data.response.message, severity : 'error' });
            if(error.response.data.response.status === 401 ){
              navigate('/login', { replace: true });
              return;
            }
            else if(error.response.data.response.status === 500 ) navigate('/',{replace:true});
          }
          else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
        })
      },[axios,postList,categoryId,setPostList,setOpenAlert,navigate,setHasMore]);

    return (
        <Container sx={{ mt: 3,mb:10 }} id="scrollableContainer"  maxWidth="md">
          <PostList posts={postList} fetchMoreData={fetchMoreData} hasMore={hasMore} />
        </Container>
      );
};

export default Auth(Category);