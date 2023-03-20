import React from 'react'
import './Form.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres,getPlatforms } from "../../Redux/actions"


const Form = () => {
  const dispatch = useDispatch();
  const Genres = useSelector(state => state.genres)
  const [inputs, setInputs] = useState({
    name: "",
    platforms: [],
    description: "",
    released: "",
    rating: 0,
    image: "",
    genres: []
  })

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getPlatforms());
  })

  const handleInputChange = (event) => { 
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }


  return (
    <div className='From'>

      <section>
          <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div>
          <div className="box">
            <div className="square" style={{ "--i": "0" }}></div>
            <div className="square" style={{ "--i": "1" }}></div>
            <div className="square" style={{ "--i": "2" }}></div>
            <div className="square" style={{ "--i": "3" }}></div>
            <div className="square" style={{ "--i": "4" }}></div>
          <div className="container">

           <form id="formcreate">
                <h2 class="title">Crea tu juego</h2>
                <div className='inputs'>
                  <input type="text" name="name" placeholder="Nombre" />
                  <input type="text" name="platforms" placeholder="Plataforma" />
                  <input type="password" name="pass" placeholder="Password" />
                  <input type="password" name="cpass" placeholder="Confirm Password" />
                  <input type="button" name="next" class="next action-button" value="Next" />
                </div>
                
            </form>

            </div>
          </div>
        </section>


    </div>
  )
}

export default Form