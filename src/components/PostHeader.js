import React, { useState } from 'react';

function PostHeader({ post }) {

    return (
        <a href={"/profile/" + post.user.id}>
            <div className="postHeader inline-flex font-semibold">
                <img className="self-center rounded-full w-6 h-6 mr-2" src={post.user.profileImageSrc} />
                <span>{post.user.username}</span>
            </div>
        </a>
    )
}


export default PostHeader;