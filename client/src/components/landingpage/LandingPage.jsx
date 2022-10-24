import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../imagen/Img_landing.gif'
import  './Landingpage.css'

export default function LandingPage() {
  return (
    <div className='divContainerLanding'>
      <img src={img} alt='Imagen_Landing' className='imgLanding'/>
        <Link to='/home'>
            <button className='buttonLanding'>START</button>
        </Link>
        </div>
  )
}
