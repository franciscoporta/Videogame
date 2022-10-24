import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideoGames } from '../../redux/actions';
import Card from '../card/Card';
import Carga from '../carga/Carga';
import Nav from '../nav/Nav'
import Paging from '../paging/Paging';
import img404 from '../../imagen/page404.jpg'
import  './Home.css'

export default function Home() {
  const allVideoGames = useSelector((state) => state.videoGames);
  const loadingRe = useSelector((state) => state.loading)

  const dispatch = useDispatch();

  //ME TRAIGO MI ESTADO GLOBAL DE LA PAGINA
  const paging = useSelector((state) => state.page)
 

  //PREPARO MI ARRAY DE PAGINAS...
  const lastIndex = 15 * paging; //1er-> = 15 | 2da-> = 30
  const firstIndex = lastIndex - 15; //1er -> 0 | 2da-> = 15
  const videoGamesPerPage = allVideoGames?.slice(firstIndex, lastIndex);


  useEffect(()=> {
    if(!allVideoGames.length) { //si en el estado de videoGames no hay nada, hace esto, sino dispatch loading
      dispatch(getVideoGames())
      dispatch(getGenres())}
      //else
      //{
      //   dispatch(setLoading(false)) 
      // }
      // eslint-disable-next-line
  },[dispatch]) 

  return (
    <div className='nav'>
        <Nav/>
        <div className='contenedorCards'>
            {
              //si loading esta en false, mostra las cartas, sino, mostra el cargando
              !loadingRe ? (videoGamesPerPage.length ?
                //si videogames tiene .length mostra las cartas, sino, no encontraste nada capo
                videoGamesPerPage.map((game) => (
                  <Card
                    key={game.id}
                    name = {game.name}
                    img={game.img}
                    id={game.id}
                    rating={game.rating}
                    genres={game.genres}
                    inDB={game.inDB}
                    />))
                    :<img src={img404} alt='img not found' className='imgNotFound'/> 
                    )
                    :<Carga/>
                  }
        </div>
        <div>
          <Paging
          allVideoGames={allVideoGames?.length}/>
        </div>
        </div>
  )
}

