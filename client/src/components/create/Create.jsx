import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getGenres, postVideoGames } from '../../redux/actions'
import './Create.css'



export default function Create() {

  const formatDate = () => {
    const date = new Date();
    return date.toISOString().slice(0, 10);
}

  
  const allGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabled, setDisable] = useState({
    platform:false, 
    genre:false, 
    genres:false, 
    platforms:false
  });

  const [error, setError] = useState({
    name:'',
    description:'',
    released:'',
    rating:'',
    platforms:'',
    genres:'',
    imagen:''
  });

  const [input, setInput] = useState({
    name: '',
    description: '',
    released: formatDate(),
    rating: '',
    imagen: '',
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres())
  },[dispatch]);

  
  let platform = ['Android', 'iOS', 'Linux', 'macOS', 'Nintendo Switch', 'Nintendo 3DS', 'PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'PS Vita', 'Wii U', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series S/X', ];

  const regExName = new RegExp("^[a-zA-Z ]+$");

  function handleName(e){ // ACA TODAVIA ME FALTA PONER EL DE EXPRESIONES REGULARES
   
    if(e.target.value.length === 0 || e.target.value === ''){
      setError({...error, name:'You must enter a name!!'})
    }
    else if (e.target.value.length >= 1){
      if(!regExName.test(e.target.value)){
        setError({...error, name:'The name cannot have signs'})
      } else{
        setError({...error, name:''})
      }
    } 
    setInput({
      ...input,
      name: e.target.value
    })
  }

  function handleDescription(e){ //me faltaria poner que si el .length es mayor a 200 que tire un error y lo de los caracteres
    if(e.target.value === '' || e.target.value.length === 0){
      setError({...error, description:'You must enter a description'})
    }
    else if(e.target.value.length >= 1){
      if(e.target.value.length > 150){
        setError({...error, description:'The description should not have more than 150 characters'})
      }
      setError({...error, description:''})
    }
    setInput({
      ...input,
      description: e.target.value
    })
  }

  function handleRating(e){ //que el rating no sea mayor a...
    if(e.target.value > 5 || e.target.value < 1 || e.target.value.length === 0){
      setError({...error, rating:'The rating cannot be greater than 5 or less than 1'})
    }
    else if (e.target.value > 1  || e.target.value < 6){
      setError({...error, rating:''})
    }
    setInput({...input, rating: e.target.value})
  }


  function handleSubmit(e){ //que no falte ningun estado de error, o algo de eso para poder hacer el dispatch
    e.preventDefault()
    if(!error.name && !error.description && input.platforms.length > 0 && !error.rating && !error.released && input.genres.length !== 0){
      dispatch(postVideoGames(input))
      alert('Video Game created successfully!!')
      navigate('/home')
    }
    else {
      alert('Missing to add fields')
    }
  
  }

  function handleReleased (e) {//que los dias no sean mayor a 30, meses mayores a 12 y año no sea mayor a 2022
    e.preventDefault()
    if(e.target.value.slice(0, 4)>2024) {
      setError({...error, released:'released date cannot be after 2024'})
    }
    if(e.target.value.slice(0, 4)<1970) {
      setError({...error, released:'released date cannot be after 1970'})
    }
      if(e.target.value.slice(0, 4) > 1970 && e.target.value.slice(0, 4) < 2024 ){
        setError({...error, released:''})}
    setInput({ ...input, released: e.target.value })
  }

  function handlePlatform (e){//aca creo que no me falta nada
    setDisable({...disabled, platform:true})
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value]
    })
  }

  function handleGenres (e){ //aca tampoco deberia faltarme
    setDisable({...disabled, genre:true})
  
    if(input.genres.length >= 2){
      setDisable({...disabled, genres:true})
    }
    
    setInput({
      ...input,
      genres:[...input.genres, e.target.value]
    })
  }

  function handleImagen(e){ //y aca debeo investigar mas FIJARSE EXPRESIONES REGULARES
    setInput({...input, imagen: e.target.value})
  }

  function handleButtonPlatforms(e){
    let p = input.platforms.filter((pl) => pl !== e.target.value)
    setInput({...input, platforms: p})
    setDisable({...disabled, platforms:false})
    document.getElementById('platforms').selectedIndex = 0
  }

  function handleDeleteGenre(e){
    let g = input.genres.filter((ge) => ge !== e.target.value)
    setInput({...input, genres: g})
    setDisable({...disabled, genres:false})
    document.getElementById('genre').selectedIndex = 0
  }


  return (
    <div className='divForm'>
      <div className='divFormStyle'>
        <div className='divTitle'>
        <Link className='linkCreate' to='/home'>
            <button className='button'> BACK </button>
        </Link>
        <h1>CREATE A VIDEOGAME</h1>
        </div>
        {/* div input style */}
        <div className='divContainer'>

        <form onSubmit={(e) => handleSubmit(e)}>

          <div className='divInputLabel'>
            <label>Name: </label>
            <input
            name='name'
            placeholder='Name...'
            value={input.name}
            onChange={(e) => handleName(e)}
            />
          </div>
          {error.name && <p className='error'>{error.name}</p>}
          
          <div className='divInputLabel'>
            <label>Description: </label>
            <input
            name='description'
            placeholder='Description...'
            value={input.description}
            onChange={(e) => handleDescription(e)}
            className='description'
            />
          </div>
          {error.description && <p className='error'>{error.description}</p>}

          <div className='divInputLabel'>
            <label>Released: </label>
            <input  
            type='date' 
            name='released' 
            key='released' 
            value={input.released}
            onChange={(e) => handleReleased(e)}
            />
          </div>
          {error.released && <p className='error'>{error.released}</p>}
         
         <div className='divInputLabel'>
          <label>Rating: </label>
          <input
          name='rating'
          value={input.rating}
          onChange={(e) => handleRating(e)}
          />
         </div>
          {error.rating && <p className='error'>{error.rating}</p>}

          <div className='divPlatGen'>
            <label>Platforms: </label>
            <select id='platforms' onChange={(e) => handlePlatform(e)} disabled={disabled.platforms}>
              <option value='platforms' disabled={disabled.platform}>Platforms</option>
              {
                platform.map(p =>
                  <option value={p} name={p} key={p}>{p}</option> )
              }
            </select>
            <ul>
              {input.platforms && input.platforms.map((p) => <div className='divSelectButton' key={p}>
                <h5>
                  {p}
                  </h5>
                  <button className='buttonSelect' value={p} onClick={(e) => handleButtonPlatforms(e)}>X</button></div> )}
            </ul>
          </div>
          
          <div className='divPlatGen'>
            <label>Genres: </label>
                <select id='genre' onChange={(e) => handleGenres(e)} disabled={disabled.genres}>
                  <option value='genres' disabled={disabled.genre}> Genres </option>
                  {
                    allGenres && allGenres.map((g) => 
                    <option value={g.name} name={g.name} key={g.name}>
                      {g.name} </option>)
                  }
              </select>

              <ul>
                {input.genres && input.genres.map((g) => 
                <div className='divSelectButton' key={g}> <h5>{g} </h5>
                  <button className='buttonSelect' value={g} onClick={(e) => handleDeleteGenre(e)}> X 
                  </button>
                </div>)}
              </ul>
              {error.genres && <p className='error'>{error.genres}</p>}
            </div>

         <div className='divInputLabel'>
          <label>Imagen: </label>
          <input
          name='imagen'
          placeholder='Imagen...'
          value={input.imagen}
          onChange={(e) => handleImagen(e)}
          />
         </div>
          {error.imagen && <p className='error'>{error.imagen}</p>}
          {/* div inputstyle */}

          <button className='button' type='submit' > Create </button>

        </form>
        </div>
      </div>

    </div>
  )
}
