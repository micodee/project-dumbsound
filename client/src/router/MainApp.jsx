import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdminAddArtis, AdminAddMusic, AdminListMusic, Home, PlayMusic, UserPremium, UserProfile } from "../pages";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "../context/contextUser";
import { useQuery } from "react-query"
import Header from "../components/Header";
import PrivateRouteUser from "./PrivateRouteUser";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import AdminUpdateArtis from "../pages/AdminUpdateArtis";
import AdminListIncome from "../pages/AdminListIncome";

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
  const [artisList, setArtis] = useState([])

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
  useQuery('artisCache', async () => {
    try {
      const response = await API.get('/artis')
      setArtis(response.data.data)
    }
    catch (error) {
      return
    }
  })

  return (
    <>
      <Header IsLogin={state.user.role} user={userList} />
      {isLoading ? null :
        <Routes>
          <Route path="/" element={<Home music={musicList} IsLogin={state.user.role} />} />
          <Route path="/play-music/:id" element={<PlayMusic music={musicList} />} />
          
          <Route path="/" element={<PrivateRouteUser IsRole={state.user.role}/>}>
            <Route path="/premium" element={<UserPremium IsLogin={state.user.role} user={userList} />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route path="/" element={<PrivateRouteAdmin IsRole={state.user.role}/>}>
            <Route path="/add-music" element={<AdminAddMusic IsLogin={state.user.role} artis={artisList} />} />
            <Route path="/add-artis" element={<AdminAddArtis artis={artisList} />} />
            <Route path="/update-artis/:id" element={<AdminUpdateArtis artis={artisList} />} />
            <Route path="/list-music" element={<AdminListMusic music={musicList} />} />
            <Route path="/list-income" element={<AdminListIncome music={musicList} />} />
          </Route>
        </Routes>
      }
    </>
  );
}
