import React from 'react'
import { Link } from 'react-router-dom'
import img404 from '../../imagen/page404.jpg'
import './Page404.css'

export default function Page404() {
  return (
    <div>
      <br/>
        <Link to='/home'>
            <button className='button404'>Home</button>
        </Link>
        <br/><br/>

        <img src={img404} alt='img not found'/>
    </div>
  )
}
