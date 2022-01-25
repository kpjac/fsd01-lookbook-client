import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Post from "../components/Post";
import FollowButton from "../components/FollowButton";

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState({});

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/read/${id}`).then((response) => {
      setUsername(response.data.username);
      setFullName(response.data.fullName);
      setEmail(response.data.email);
      setUserType(response.data.userType);
      setUser({
        id: response.data.id
      });
    });

    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data === "none found") {
          setListOfPosts(null);
        } else {
          setListOfPosts(response.data);
        }
      });

    document.title = "Profile - Instagram";
  }, [id]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
      <h1 className="text-5xl font-medium leading-tight mt-0 mb-2 text-black-600">
        Profile page
      </h1>

        <FollowButton user={user}/>
        <h2 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black-600">
          {" "}
          Username: {username}
        </h2>
        <h2 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black-600">
          {" "}
          Full name: {fullName}
        </h2>
        <h2 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black-600">
          {" "}
          Email: {email}
        </h2>
        {authState.username === username && userType === "admin" && (
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {
              navigate("/admin");
            }}
          >
            {" "}
            Go to admin console
          </button>
        )}
        {authState.username === username && userType !== "admin" && (
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => {
              navigate("/account");
            }}
          >
            {" "}
            Change My Information
          </button>
        )}

      </div>
      <div className="container grid grid-cols-3 gap-2 mx-auto">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} >
              <Post post={value}></Post>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
