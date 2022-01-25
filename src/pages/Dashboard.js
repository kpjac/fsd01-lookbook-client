import React from 'react'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import UserForFollow from '../components/UserForFollow';
import { Spinner } from '@chakra-ui/spinner';


function Dashboard() {
  document.title = `Lookbook`;

  const [usersForFollow, setUsersForFollow] = useState([]);
  const [posts, setPosts] = useState([]);
  const [prevY, setPrevY] = useState(0);

  const [loading, setLoading] = useState(false);

  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  prevYRef.current = prevY;

  let oldestPostId = useRef("");

  let postsRef = useRef({});
  postsRef.current = posts;


  console.log("loadingRef: ", loadingRef)

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/posts/feed`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data === "none found") {
        setPosts(null);
        axios.get(`${process.env.REACT_APP_API_URL}/auth/suggested`).then((response2) => {
          console.log(response2.data);
          setUsersForFollow(response2.data);
          console.log(usersForFollow);
        })
      } else {
        setPosts(response.data.posts);
        oldestPostId.current = response.data.oldest;
      };

      let options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      }

      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(loadingRef.current);

    });

  }, []);


  if (!posts) {
    return (
    <>
    <h1 className="text-5xl text-center font-medium leading-tight mt-0 mb-2 text-black-600">
    Your feed is empty. Try following some people.
      </h1>

      <h2 className="text-3xl text-center font-medium leading-tight mt-0 mb-2 text-black-600">Suggested for you:</h2>
      <div className="container grid grid-cols-5 gap-2 mx-auto">
      {usersForFollow.map((user, key) => {
        return (
          <div className="userForFollow" key={key}>
            <UserForFollow user={user} />
          </div>
        )
      })}
      </div>
    </>
    )
  }


  const handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;
    if (prevYRef.current > y) {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_URL}/posts/feed/next`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
          Oldest_PostId: oldestPostId.current
        }
      }).then((response) => {
        if (response.data === "none found") {
          console.log("no posts found");
          setLoading(false);
        } else {
          setPosts([...postsRef.current, ...response.data.posts]);
          oldestPostId.current = response.data.oldest;
          setLoading(false);
        }

      })
    } else {
      console.log("not time to get more posts")
    }
    console.log("currentY: ", y, "prevY: ", prevY);
    setPrevY(y);
  };

  if (posts.length > 0) {
    return (
      <div>
        <div className="firstPosts">
          {posts.map((post, key) => {
            return (
              <div key={key} className="flex justify-center">
                <Post post={post} />
              </div>
            )
          }
          )}
        </div>
        <div
          className="flex justify-center"
          ref={loadingRef}
          style={{ height: "100px", margin: "25px" }}
        >
          <div style={{ display: loading ? "block" : "none" }}>
          <Spinner className="h-8 w-8 my-8 text-cyan-600" size='lg' />
          </div>
        </div>

      </div>
    )
  } else {
    return (
      <div className="flex justify-center">
                    <Spinner className="h-8 w-8 my-8 text-cyan-600" size='lg' />
        <br></br>
      </div>
    );
  };


}



export default Dashboard;
