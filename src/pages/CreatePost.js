import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPost from '../components/NewPost';

function CreatePost() {
    document.title = `Create Post | Lookbook`;


    let navigate = useNavigate();


    return (
        <NewPost></NewPost>
    )
}

export default CreatePost;