import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Textarea from 'react-expanding-textarea';

function NewComment({ post, addComment }) {

    const { authState } = useContext(AuthContext);

    const [buttonActive, setButtonActive] = useState(false);

    const toggleButtonActive = (event) => {
        if (event.target.value !== "") {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    }

    const processNewComment = (event) => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/posts/comment`, {
            postId: post.id,
            commentBody: event.target.commentBody.value
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            addComment(response.data);
            event.target.commentBody.value = "";
        });
    }


    return <form onSubmit={processNewComment}>
        <div className="inline-flex">
            <img className="self-center rounded-full w-6 h-6 mx-1" src={authState.profileImageSrc} />
            <Textarea
                autoFocus
                name="commentBody"
                id="commentBody"
                className="form-control w-72 mx-1"
                placeholder="Add a comment..."
                onChange={toggleButtonActive}>
            </Textarea>
            {buttonActive ? (
                <button type="submit" className="h-10 mx-1 self-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full">
                    Post
                </button>
            ) : (
                <button className="h-10 mx-1 self-center bg-blue-500 text-white font-bold py-1.5 px-3 rounded-full opacity-50 cursor-not-allowed">
                    Post
                </button>
            )}


        </div>
    </form>;

}

export default NewComment;
