import React, { useState } from 'react';
import axios from 'axios';
import FollowButton from './FollowButton';


function UserForFollow({ user }) {



    return (
        <>
            <div>
                <a href={"/profile/" + user._id}>
                <img width="80px" src={user.profileImageSrc} />
                <p>{user.username}</p>
                </a>
            </div>
            <FollowButton user={user}></FollowButton>
        </>
    )
}


export default UserForFollow;