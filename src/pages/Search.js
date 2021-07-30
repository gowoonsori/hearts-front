import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import instance from "../atoms/axios";
import { searchPost } from "../atoms/post";
import PostList from "../components/lists/PostList";
import Auth from "../hoc/auth";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Search = () => {
    let query = useQuery();
    const postId = query.get("keyword");
    const axios = useRecoilValue(instance);
    const [posts,setPosts] = useRecoilState(searchPost);

    useEffect(()=>{
        axios.get(`/search?keyword=${postId}`)
        .then(res=>{
            if(res?.data.success){
                setPosts(res.data.response);
            }
        })
        .catch((e)=>console.log(e));
    },[]);

    return (
        <Container sx={{ mt: 3 }} maxWidth="md">
          <PostList posts={posts} />
        </Container>
      );
};

export default Auth(Search);