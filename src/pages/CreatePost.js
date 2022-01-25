import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPost from '../components/NewPost';

function CreatePost() {

    let navigate = useNavigate();


    return (
        <NewPost></NewPost>
    )
}

export default CreatePost;