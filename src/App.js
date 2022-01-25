import './index.css';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tag from './pages/Tag';
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import AdminDeleteUser from "./pages/AdminDeleteUser";
import AdminUpdateUser from "./pages/AdminUpdateUser";
import Registration from "./pages/Registration";
import ErrorPage from "./pages/ErrorPage";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    profileImageSrc: "",
    type: "",
    status: false
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/auth`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error)
        setAuthState({ ...authState, status: false });
      else
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          profileImageSrc: response.data.profileImageSrc,
          type: response.data.type,
          status: true
        });
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      type: "",
      status: false
    });
  }


  return (
    <div className="App">
      <AuthContext.Provider
        value={{ authState, setAuthState }}>
        <Router>
          <nav className="relative
w-full
flex flex-wrap
items-center
justify-between
py-4
mb-4
bg-gray-100
shadow-lg
navbar navbar-expand-lg navbar-light
"><span className="text-2xl px-4 font-semibold text-sky-700">Lookbook</span>
            <div class="container-fluid flex flex-wrap items-center justify-between px-6 text-gray-500
hover:text-gray-800
focus:text-gray-800">

              <Link className="font-me px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" to="/">Dashboard</Link>
              <Link className="font-me px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" to="/createpost">Create a Post</Link>
              {!authState.status ? (
                <>
                  <Link className="font-me px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" to="/login">Login</Link>
                  <Link className="font-me px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" to="/registration">Register</Link>
                </>
              ) : (
                <><Link className="font-me px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" to="/account">My Account</Link>
                  <button className="font-me px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" onClick={logout}>Logout</button>
                </>
              )}
            </div>
          </nav>

          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/account" exact element={<Account />} />
              <Route path="/createPost" element={<CreatePost />} />
            </Route>
            <Route path="/login" exact element={<Login />} />
            <Route path="/posts/tag/:tag" exact element={<Tag />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/admin" exact element={<Admin />} />
            <Route path="/admin/delete/:id" exact element={<AdminDeleteUser />} />
            <Route path="/admin/update/:id" exact element={<AdminUpdateUser />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>

        <footer>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Team01 FSD01 All rights reserved.
          </p>
        </footer>
      </AuthContext.Provider>
    </div>
  );

  function RequireAuth() {
    let location = useLocation();

    if (!authState.status) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
  }
}




export default App;
