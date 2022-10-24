import axios from "axios";


export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_DETAIL= "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const SEARCH_GAME = "SEARCH_GAME";
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_GENRE = "FILTER_GENRE";
export const SET_LOADING = "SET_LOADING";
export const ORDER_ALPH = "ORDER_ALPH";
export const ORDER_RATING = "ORDER_RATING";
export const POST_VIDEOGAMES = "POST_VIDEOGAMES";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
export const UPDATE_VIDEOGAME = "UPDATE_VIDEOGAME";

export const getVideoGames = () => {
   return async function (dispatch){
    let json = await axios.get("http://localhost:3001/videogames")
    return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data
    });
   };
}


export const getGenres = () =>{
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/genres")
        return dispatch({
            type: GET_GENRES,
            payload:json.data
        })
    }
}

export const getDetail = (id) => {
    return async function (dispatch){
        let json = await axios.get(`http://localhost:3001/videogame/${id}`)
        return dispatch({
            type:GET_DETAIL,
            payload: json.data
        })
    }
}


export const clearDetail = () => {
    return {
        type: CLEAR_DETAIL
    }
}

export const searchGame = (name) => {
    return async function (dispatch){
        let json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({
            type: SEARCH_GAME,
            payload: json.data
        })
    }
}

export const paging = (payload) => { //payload va a entrar el numero de pagina, va a reducer
    return {
      type: SET_CURRENT_PAGE,
      payload
    };
}


export const filterCreated = (payload) => {
    return{
        type:FILTER_CREATED,
        payload
    }
}

export const filterGenre = (payload) => {
    return{
        type: FILTER_GENRE,
        payload
    }
}

export const setLoading = (payload) => {
    return {
        type: SET_LOADING, 
        payload
    } 
}

export const orderAlph = (payload) => {
    return{
        type: ORDER_ALPH,
        payload
    }
}

export const orderRating = (payload) => {
    return{
        type:ORDER_RATING,
        payload
    }
}

export const postVideoGames = (videogame) => {
    return  async function (dispatch){
        axios.post("http://localhost:3001/videogames", videogame)
            .then(res => {
                dispatch({type: POST_VIDEOGAMES, payload: res.data})
                    console.log(res.data)
            })
        }
    }


export const deleteVideogames = (id) => {
    return function (dispatch){
        axios.delete(`http://localhost:3001/videogame/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_VIDEOGAME,
                payload: res
            })
        })
    }
}

// export const updateVideogame = (id) =>{
//     return function (dispatch){
//         axios.put(`http://localhost:3001/videogame/${id}`)
//         .then((res) =>{
//             dispatch({
//                 type: UPDATE_VIDEOGAME,
//                 payload: res
//             })
//         })
//     }
// }
// export function deleteVideogame(id) {
//     return function (dispatch) {
//         return axios.delete(`/videogames/${id}`)
//         .then(msg =>
//             dispatch({ type: DELETE_VIDEOGAME, payload: msg }))
//     }    
// }
//     let json = await axios.post("http://localhost:3001/videogames", videogame) //le paso el payload(lo que le paso por los inputs), se pasa asi, la ruta, payload
//     console.log('json', json)
    
//     return dispatch({
//       type:POST_VIDEOGAMES,
//       payload: json
//     })
//   }
// }



