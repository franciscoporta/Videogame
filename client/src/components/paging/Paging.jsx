import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paging } from '../../redux/actions';
import './Paging.css'

export default function Paging({allVideoGames}) {//x props me tira el .length
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page);

    const pageNumber = Array(Math.ceil(allVideoGames / 15)) // a la variable pageNumber, le estoy asignando un array que le estoy agregando X cantidad de lugares(Match.Ceil -> devuelve el numero entero mayor mas aproximado al numero) ->  el .length de allPokemons dividilo por 15, dando la cantidad de lugares a paginas que quiero
    .fill(0) //con el .fill lo que hago es llenar ese array con todas las posiciones que tenia con 0
    .map((e, i) => (e = i + 1))// en el map estoy asignandole valores a los lugares dados arriba


    const numOfPage = (pageNumber) => { //pregunto si el pageNumer es igual al estado global, da true, sino da false y va cambiando el estilo de los botones del paginado
      if(pageNumber === page){
        return true
      }
        return false
     }


  return (
   <div className='divPagination'>
      <ul className='divUl'>
        {
          pageNumber?.map((number) => (
            <li key={number} className='li'>
              {
              numOfPage(number)?
                <a className='a'
                  onClick={() => dispatch(paging(number))}>
                  {number}
                </a>:
                <a className='a1'
                  onClick={() => dispatch(paging(number))}>
                  {number}
                </a>
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}
