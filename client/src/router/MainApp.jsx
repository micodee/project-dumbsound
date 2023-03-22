import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages";
import { API } from "../config/api";
import { useQuery } from "react-query"

export default function MainApp() {
  const [musicList, setMusic] = useState([])

  useQuery('musicCache', async () => {
    try {
      const response = await API.get('/musics')
      setMusic(response.data.data)
    }
    catch (error) {
      return
    }
  })
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home music={musicList} />} />
        </Routes>
      </Router>
    </>
  );
}
