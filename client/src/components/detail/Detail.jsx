import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearDetail, deleteVideogames, getDetail, getVideoGames, paging } from '../../redux/actions';
import Carga from '../carga/Carga';
import './Detail.css'
import page404 from '../../imagen/page404.jpg'

export default function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {id} = useParams();

    const detail = useSelector((state) => state.detail) 

    useEffect(() => {
        dispatch(getDetail(id))
        dispatch(paging(1))
        return (
            () => {
                dispatch(clearDetail())
            })
            //eslint-disable-next-line
        },[dispatch])  

    async function deleteVideogame (e){
        dispatch(deleteVideogames(id))
        alert('Videogame borrado')
        await dispatch(getVideoGames())
        dispatch(paging(1))
        navigate('/home')
    }


    return(
        <div className='divContainer'>
            <div className='divContainerGame'>
                <div className='divTitle'>
                    <h1 className='title'>{detail.name}</h1>
                    {
                        id.length > 6 && <button className='back' onClick={(e) => deleteVideogame(e)}> Delete </button> 
                    }
                    <Link to='/home'>
                        <button className='back'>
                            BACK                 
                        </button>
                    </Link>
                </div>
                {
                    !detail.name ? <Carga/> : (
                        <>
                            <div className='divContainerDetail'>
                                <img className='img' src={detail.img ? detail.img : page404} alt='icono'  />
                                <h4 className='descriptionDetail'>Description: {detail.description}</h4>
                            </div>
                            <div className='divDetail2'>
                                <h2>Released: {detail.released}</h2>
                                <h2>Rating: {detail.rating}</h2>
                                {<h2>Genres: {detail.genres.map((g) => g + ' ')}</h2>} 
                            </div>
                            {<h2>Plataforms: {detail.platforms.map((p) => p + ' ')}</h2>}
                        </>
                    )
                }
            </div>
        </div>
    )

    // console.log(detail)
//   return (
//     <div className='divContainer'>
//         <div className='divContainerGame'>
    
//             {/* <div>
//                 {
//                     id.length > 6 && <button onClick={(e) => deleteVideogame(e)}> delete </button>
//                 }
//                 <Link to='/home'>
//                 <button className='back'>
//                     BACK
//                 </button>
//                 </Link>
//             </div> */}
//             <div className='divTitle'>
//                 <h1 className='title'>{detail.name}</h1>
//                 {
//                     id.length > 6 && <button onClick={(e) => deleteVideogame(e)}> delete </button>
//                 }
//                 <Link to='/home'>
//                     <button className='back'>
//                         BACK
//                         </button>
//                         </Link>
//             </div>
//             {
//                 Object.keys(detail).length!==0?
//                 <>
//                     <div className='divContainterDetal'>
//                         <img className='img' src={detail.img} alt='icono'  />
//                         <h4 className='description'>Description: {detail.description}</h4>
//                     </div>
//                     <div className='divDetail2'>
//                         <h2>Released: {detail.released}</h2>
//                         <h2>Rating: {detail.rating}</h2>
//                         {<h2>Genres: {detail.genres.map((g) => g + ' ')}</h2>} 
//                     </div>
//                         {<h2>Plataforms: {detail.platforms.map((p) => p + ' ')}</h2>}
//                 </>
//                 // <div key={detail.id}>
//                 //     <h1 className='name'>Name: {detail.name}</h1>
//                 //     <img src={detail.img} alt='icono' className='imgDetail' />
                 
//                 //     {<p>Genres: {detail.genres.map((g) => g + ' ')}</p>} 
//                 //     <p>Description: {detail.description}</p>
//                 //     {<p>Plataforms: {detail.platforms.map((p) => p + ' ')}</p>}
//                 //     <p>Rating: {detail.rating}</p>
//                 //     <p>Released: {detail.released}</p>
//                 // </div>
//                 :<Carga/>
//             }
      
//         </div>
//     </div>
//   )
}
