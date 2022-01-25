import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/solid';
import { AuthContext } from '../helpers/AuthContext';


function LikeButton({ post, addLike, removeLike }) {

    const { authState } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        if (post.likes) {
            if (post.likes.includes(authState.id)) {
                setLiked(true);
            }
        }
    })

    const like = (postId) => {
        axios.put(`${process.env.REACT_APP_API_URL}/posts/like`, {
            id: postId
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setLiked(true);
            addLike();
        });
    }

    const unlike = (postId) => {
        axios.put(`${process.env.REACT_APP_API_URL}/posts/unlike`, {
            id: postId
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            post.likes = post.likes.filter(item => item !== authState.id);
            setLiked(false);
            removeLike();
        });
    }

    return ( liked ?
        <button onClick={unlike.bind(this, post.id)}>
            <HeartSolid className='h-6 w-6 text-rose-600 hover:scale-90 hover:fill-white hover:stroke-black hover:stroke-2'></HeartSolid>
        </button>
        :
        <button onClick={like.bind(this, post.id)}>
            <HeartIcon className='h-6 w-6 hover:scale-125 hover:fill-rose-600 hover:stroke-rose-600'></HeartIcon>
        </button>
        
    )
}


export default LikeButton;