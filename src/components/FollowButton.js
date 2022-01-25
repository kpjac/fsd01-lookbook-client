import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function FollowButton({ user }) {
  const { authState } = useContext(AuthContext);

  let id = user._id;
  if (user.id) {
    id = user.id;
  }

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (user.following) {
      if (user.following.includes(authState.id)) {
        setFollowed(true);
      }
    }
  });

  const processFollow = (userId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/follow`,
        {
          id: userId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);

        setFollowed(true);
      });
  };

  const processUnfollow = (userId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/auth/unfollow`,
        {
          id: userId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        setFollowed(false);
      });
  };

  return followed ? (
    <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={processUnfollow.bind(this, id)}
    >
      Unfollow
    </button>
  ) : (
    <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={processFollow.bind(this, id)}
    >
      Follow
    </button>
  );
}

export default FollowButton;
