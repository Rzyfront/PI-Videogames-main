import React from 'react'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames, getGenres } from '../../Redux/actions.js';

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getGenres());
  });

  return (
    <div><h1>BIENVENIDO SOY EL LANDING PAGEEEEEE</h1></div>
  )
}

export default Landing