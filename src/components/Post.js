import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import PostHeader from "./PostHeader";
import LikeButton from "./LikeButton";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { ChatAltIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Interweave from 'interweave';
import { HashtagMatcher } from 'interweave-autolink';


function Post({ post }) {

    const { authState } = useContext(AuthContext);

    const [likes, setLikes] = useState(post.likes.length);

    const [comments, setComments] = useState([]);

    const [commentsShown, setCommentsShown] = useState(false);

    const [newCommentShown, setNewCommentShown] = useState(false);

    useEffect(() => {
        setComments(post.comments);
    }, []);

    const addLike = () => {
        setLikes(likes + 1);
    }

    const removeLike = () => {
        if (likes > 0) {
            setLikes(likes - 1);
        }
    }

    const showComments = () => {
        setCommentsShown(true);
    }

    const showNewComment = () => {
        setNewCommentShown(true);
    }

    const addComment = (comment) => {
        console.log(comments);
        setComments(comments => [...comments, comment]);
        if (comments.length === 0) {
            showComments();
        }
        console.log(comments);

    }


    return (
        //TODO add link to indidual post?
        <div className="rounded-lg shadow-lg bg-white max-w-sm py-3 my-3">
            <PostHeader post={post} />
            <a href="#!">
                <img class="rounded-t-lg" width="400px" src={post.imageSrc}></img>
            </a>
            <div className="interactions p-2">
                <div className="interactionBtns inline-flex">
                    <LikeButton post={post} addLike={addLike} removeLike={removeLike} />
                    <button onClick={showNewComment} className="pl-2 hover:scale-125">
                        <ChatAltIcon className='h-6 w-6'></ChatAltIcon>
                    </button>
                </div>
                <div>
                    <span className="font-semibold">{likes} likes</span>
                </div>
            </div>
            <div className="py-3">
                <p className="text-xs">{moment(post.createdAt).utc().format('MMMM D, YYYY [at] hh:mm a')}</p>
                <p className="text-gray-700 text-base mb-4 caption"><a className="font-semibold" href={"/profile/" + post.user.id}>{post.user.username}</a>&nbsp;
                     <Interweave
                        content={post.caption}
                        matchers={[new HashtagMatcher('hashtag')]}
                        hashtagUrl={hashtag => `/posts/tag/${hashtag}`}
                    />
                </p>
            </div>
            {comments.length > 0 && !commentsShown ? (
                <button onClick={showComments}><span>{"View all " + comments.length + " comments"}</span></button>
            )
                : ""
            }
            {comments.length === 0 && !commentsShown ?
                (
                    <span>Be the first to leave a comment</span>
                ) : ""
            }
            {commentsShown ? (
                comments.map((comment, key) => {
                    return (
                        <div key={key}>
                            <Comment comment={comment} postId={post.id} />
                        </div>
                    )
                })
            ) : ""
            }
            {
                (commentsShown && !newCommentShown ? <NewComment post={post} addComment={addComment}></NewComment> : "")

            }
            {newCommentShown ? (
                <NewComment post={post} addComment={addComment} />
            ) : ""
            }
        </div>
    );
}

export default Post;
