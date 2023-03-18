import React from 'react'
import { IoFilterCircleOutline, IoFilterCircleSharp } from 'react-icons/io5';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector  } from "react-redux";
import { getAllVideogames } from '../../Redux/actions.js';


const Home = () => {
  const [toggleFilter, setToggleFilter] = useState();
  const Games = useSelector((state) => state.allVideogames);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Games) {
      dispatch(getAllVideogames());
    }
  });

  return (
    <div className='Home'>
      <div className='Filters'>
  


        <div className='filterMenu'>
          {toggleFilter
          ? <IoFilterCircleOutline color='fff' size={27} onClick={() => setToggleFilter(false)}/>
          : <IoFilterCircleSharp color='fff' size={27} onClick={() => setToggleFilter(true)}/>
        }
        {toggleFilter && (
          <div className="filterMenu-toggle">
            <div className="filters">
              
            
            </div>
          </div>
          
        )}

        </div>
      </div>
      <div className='renderCards'>
        {
          Games &&
          Games.map((game) => {
            return <Card
            
            
            
            
            />
          }) 
        }
      </div>
    </div>
  )
}

export default Home