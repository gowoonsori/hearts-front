import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {  useRecoilState, useRecoilValue } from "recoil";
import instance from "../atoms/axios";
import {  posts } from "../atoms/post";
import PostList from "../components/lists/PostList";
import Auth from "../hoc/auth";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Category = () => {
    let query = useQuery();
    const axios = useRecoilValue(instance);
    const categoryId = query.get("id");
    const [postList,setPostList] = useRecoilState(posts);

    useEffect(()=>{
        axios.get(`/user/post/category/${categoryId}`)
        .then(res=>{
            if (res?.data?.success) {
                setPostList(res.data.response);
            }
        }).catch((e) => console.log(e));
    },[axios,setPostList,categoryId]);
    

    return (
        <Container sx={{ mt: 3 }} maxWidth="md">
          <PostList posts={postList} />
        </Container>
      );
};

export default Auth(Category);