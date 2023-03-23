import React from 'react'
import Header from '../components/Header'

export default function AdminAddMusic(props) {
  return (
    <>
     <Header IsLogin={props.IsLogin} />
     <h1>Add Music</h1>
    </>
  )
}
