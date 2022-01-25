import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Comment({ comment, postId }) {

  const { authState } = useContext(AuthContext);

  const [deleted, setDeleted] = useState(false);

  const deleteComment = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/posts/deleteComment`, {
      commentId: comment._id,
      postId: postId
    }, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data === "comment deleted") {
        setDeleted(true);
      }
    });

  }

  if (!deleted) {
    return <><div className="inline-flex">
      <img className="self-center rounded-full w-6 h-6 mx-1" src={comment.user.profileImageSrc} />
      <p className="self-center text-gray-700 text-sm mb-4"><a href={"/profile/" + comment.user.id}><span className="font-semibold">{comment.user.username}</span></a> {comment.body}</p>
    </div>
      {comment.user.id === authState.id ? (
        <button onClick={deleteComment} className="text-right text-xs float-right mr-1 text-slate-600/70 hover:text-slate-600/100">delete</button>) : ""
      }</>
  } else {
    return null;
  }
}

export default Comment;
