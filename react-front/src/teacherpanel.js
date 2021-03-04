import React, { useState } from "react";
import axios from 'axios';
import './css/home.css';
import useToken from './useToken';

export default function TeacherPanel() {
  const { logout } = useToken();

  return ( 
    <div className="home-wrapper">
      <button onClick={logout}>Wyloguj</button>
    </div>  
    )
}