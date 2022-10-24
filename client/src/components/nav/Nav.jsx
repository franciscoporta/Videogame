import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getVideoGames, paging, setLoading } from '../../redux/actions';
import SearchBar from '../searchbar/SearchBar'
import './Nav.css'

export default function Nav() {
  const dispatch = useDispatch();

  function handleClick(e){
    e.preventDefault(e)
    dispatch(setLoading(true))
    dispatch(getVideoGames())
    dispatch(paging(1))
  }

  return (
    <div className='navBar'>
      <div className='divNav'>
        <Link to='/' className='navLink'>
            Landing
        </Link>
        <Link className='navLink' to='/create'>
           Create VideoGames
        </Link>
        <button className='navLink' onClick={(e) => handleClick(e)}>
          Load to Video Games
        </button>
      </div>
        <div>
          <SearchBar/>
        </div>
    </div>
  )
}
