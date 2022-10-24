import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, filterGenre, getVideoGames, orderAlph, orderRating, paging, searchGame } from '../../redux/actions';
import './SearchBar.css'

export default function SearchBar() {
    const [input, setInput] = useState(''); 
    const dispatch = useDispatch();
    const genre = useSelector((state) => state.genres)
    const [disabled, setDisabled] = useState({
        rating:false,
        genre:false,
        alph:false,
        filter:false
    })

    function handleInput(e){
        e.preventDefault()
        setInput(e.target.value)
    }
    

    function handleSubmit(e){
        if(input.length !== 0){
            e.preventDefault()
            dispatch(searchGame(input))
            .then((info) => {
                dispatch(paging(1))
                setInput('')
              });
        }else{
            e.preventDefault()
            alert('Debes ingresar un nombre')
        }
    }

    function handleCreated(e){
        setDisabled({...disabled, filter:true})
        dispatch(filterCreated(e.target.value))
        dispatch(paging(1))
    }

    function handleGenre (e){
        e.preventDefault()
        setDisabled({...disabled, genre:true})
        dispatch(filterGenre(e.target.value))
        dispatch(paging(1))
        document.getElementById("rating").selectedIndex = 0; //selectedindex devuelve el indice de la opcion seleccionado en un select(desplegable)
        document.getElementById("az").selectedIndex = 0;
        document.getElementById("filter").selectedIndex = 0;
        // document.getElementById("genre").selectedIndex = 0;
    }

    function handleAlph(e){
        e.preventDefault()
        dispatch(orderAlph(e.target.value))
        dispatch(paging(1))
        document.getElementById("rating").selectedIndex = 0;
        setDisabled({...disabled, alph:true})
        setDisabled({...disabled, filter:true})
    }

    function handleRating(e){
        e.preventDefault()
        dispatch(orderRating(e.target.value))
        dispatch(paging(1))
        document.getElementById("az").selectedIndex = 0;
        setDisabled({...disabled, rating:true})
        setDisabled({...disabled, alph:true})
    }

    function clearFilter(e){
        document.getElementById("rating").selectedIndex = 0; //selectedindex devuelve el indice de la opcion seleccionado en un select(desplegable)
        document.getElementById("az").selectedIndex = 0;
        document.getElementById("filter").selectedIndex = 0;
        document.getElementById("genre").selectedIndex = 0;
        document.getElementsByClassName("input")[0].value = "";
        dispatch(getVideoGames())
    }

  return (
    <div className='divContainter'>
            <div>
                <form  onSubmit={(e) => handleSubmit(e)}>
                    <input 
                    className='input'
                    type='text' 
                    placeholder='Busca tu Video Juego...'
                    autoComplete='off'
                    value={input}
                    onChange={(e) => handleInput(e)}
                    />
                </form>
            </div>
        <div className='divSelect'>

            <select id='filter' onChange={(e) => handleCreated(e)}>
            <option value ='filter' disabled={disabled.filter}>Filter</option>
                <option value="All">All</option>
                <option value="DB">From DB</option>
                <option value="Api">From Api</option>
            </select>
        </div>
        <div className='divSelect'>

            <select id='genre' onChange={(e) => handleGenre(e)}>
            <option value ='genre' disabled={disabled.genre}>Genres</option>
                <option value='All'>All</option>
                {
                    genre && genre.map((g) => <option value={g.name} key={g.name}>
                        {g.name}
                        </option>)
                }
            </select>
        </div>
        <div className='divSelect'>

            <select id='az' onChange={(e) => handleAlph(e)}>
            <option value ='alph' disabled={disabled.alph}>Order Alph</option>
                <option value='All'>All</option>
                <option value='A - Z'>A - Z</option>
                <option value='Z - A'>Z - A</option>
            </select>
        </div>

        <div className='divSelect'>

            <select id='rating' onChange={(e) => handleRating(e)}>
                <option value ='rating' disabled={disabled.rating}>Rating</option>
                <option value="All"> All </option>
                <option value="Max">Max </option>
                <option value="Min"> Min </option>
            </select>
        </div>

        
            <button className='button' onClick={(e) => clearFilter(e)}>CLEAR FILTER</button>
        </div>
  )
}
