import { Container } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { alertState } from "../atoms/alert";
import instance from "../atoms/axios";
import { posts } from "../atoms/post";
import { user } from "../atoms/user";
import PostList from "../components/lists/PostList";
import Auth from "../hoc/auth";
import useScrollReset from "../hooks/useScrollReset";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    let query = useQuery();
    const keyword = query.get("keyword");
    const exact = query.get("exact");
    let {field} = useParams();
    const axios = useRecoilValue(instance);
    const userInfo = useRecoilValue(user);
    const [scrollId, setScrollId] = useState('0');
    const [hasMore, setHasMore] = useState(true);
    const [postList,setPostList] = useRecoilState(posts);
    const  setOpenAlert = useSetRecoilState(alertState);
    const scrollToTop = useScrollReset;
    const navigate = useNavigate();
    field = (field === 'total') ? '' : "/" + field;
    //exact = (exact === 'true') ? true : false;

    useEffect(()=>{
        if(!userInfo?.id) return;
        scrollToTop();
        setPostList([]);
        setHasMore(true);
        axios.get(`/search${field}?keyword=${keyword}&exact=${exact}&scrollId=0`)
        .then(res=>{
            if(res?.data.success){
                if(res.data.response.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                setPostList(res.data.response?.data?.map(data => data['source']));

                setScrollId(res.data.response.scrollId);
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
    },[userInfo,exact,keyword,field]);

    const fetchMoreData = useCallback(()=> {
        axios.get(`/search${field}?keyword=${keyword}&scrollId=${scrollId}`)
        .then(res=>{
            if(res?.data.success){
                if(res.data.response.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                const newList = postList.slice(0,postList.length);
                newList.push(...res.data.response.data.map(data => data['source']));
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
                else if(error.response.data.response.status === 500  || error.response.data.response.status === 400 ) navigate('/',{replace:true});
            }
            else setOpenAlert({state:true, message: '서버로부터 응답이 없습니다.', severity: 'error' });
        });
    },[axios,field,scrollId,postList,setPostList,setHasMore,navigate,setOpenAlert]);

    return (
        <Container sx={{ mt: 3 }} maxWidth="md">
          <PostList posts={postList} fetchMoreData={fetchMoreData} hasMore={hasMore} />
        </Container>
      );
};

export default Auth(Search);