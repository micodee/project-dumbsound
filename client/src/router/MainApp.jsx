import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdminAddArtis, AdminAddMusic, Home } from "../pages";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/contextUser";
import { useQuery } from "react-query"

export default function MainApp() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };


  const [musicList, setMusic] = useState([])
  const [userList, setUser] = useState([])

  useQuery('musicCache', async () => {
    try {
      const response = await API.get('/musics')
      setMusic(response.data.data)
    }
    catch (error) {
      return
    }
  })
  useQuery('userCache', async () => {
    try {
      const response = await API.get('/check-auth')
      setUser(response.data.data)
    }
    catch (error) {
      return
    }
  })

  return (
    <>
      {isLoading ? null :
        <Routes>
          <Route path="/" element={<Home music={musicList} IsLogin={state.user.role} user={userList}/>} />
          <Route path="/add-music" element={<AdminAddMusic IsLogin={state.user.role} />} />
          <Route path="/add-artis" element={<AdminAddArtis />} />
        </Routes>
      }
    </>
  );
}
