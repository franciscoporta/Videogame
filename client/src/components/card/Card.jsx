import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.css"
import img404 from '../../imagen/page404.jpg'


export default function Card({name, id, img, rating, genres, inDB}) {


  return (
    
     <div className='cardContainer'  >
      <Link to={`/detail/${id}`} className="link"  >
        {/* {
          {img}?<img src={img} alt='icono' className='img'/>:{imgDefault}
        } */}
        {/* <img src={img} alt='icono' className='img'/> */}
        <div className='Card'  style={{ backgroundImage: `url(${img?img:img404})` }}>
        
            <h4 >{name}</h4>
          
        <div className='divGenre'>
        {
          genres.map((g) => <h5 >{ g + ' '}</h5>)
         
        }
        </div>
        {/* <h6>{rating}</h6> */}
        </div>
      </Link>
     </div> 
  )
}

