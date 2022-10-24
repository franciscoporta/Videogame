import { CLEAR_DETAIL, DELETE_VIDEOGAME, FILTER_CREATED, FILTER_GENRE, GET_DETAIL, GET_GENRES, GET_VIDEOGAMES, ORDER_ALPH, ORDER_RATING, POST_VIDEOGAMES, SEARCH_GAME, SET_CURRENT_PAGE, SET_LOADING, UPDATE_VIDEOGAME } from "../actions";


const initialState = {
    videoGames: [], //este es el que voy a mostrar
    allVideoGames: [], //este es con el que voy a filtrar luego
    genres:[],
    detail:{},
    loading: true,
    page:1,
    order:{
        alphabeticalOrder: 'All',
        orderByRating : 'All'
    }
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
           return{
               ...state,
               videoGames: action.payload,
               allVideoGames: action.payload,
               loading: false
           }
        case SET_LOADING: 
            if (action.payload === false) 
            return {
                ...state, 
                loading: false
            }
            else 
            return {
                ...state, 
                loading: true
            }
        case GET_GENRES:
            return{
                ...state,
                genres: action.payload,
                
            }
       case GET_DETAIL:
        return{
            ...state,
            detail:action.payload,
            loading: false
        }
        case CLEAR_DETAIL:
            return{
                ...state,
                detail: {}
            }
        case SEARCH_GAME:
            return{
                ...state,
                videoGames: action.payload
            }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                page:action.payload
            }
        case FILTER_CREATED:
            const allVideoGames = state.allVideoGames;
            const createdFilter = action.payload === 'DB'? allVideoGames.filter( el => el.inDB):allVideoGames.filter( el => !el.inDB);
            return{
                ...state,
                videoGames: action.payload === 'All'?allVideoGames:createdFilter
            }
        case FILTER_GENRE:
            //IR MODIFICANDO ESTO!!!
            //const allVideoGames2 = state.videoGames;
            const allVideoGames2 = state.allVideoGames;
            const genreFilter = action.payload === 'All'?allVideoGames2
            :allVideoGames2.filter((videogame) => {
                return videogame.genres.includes(action.payload);
					  });
            return{
                ...state,
                videoGames: genreFilter
            }
            
        case ORDER_ALPH:
            if (action.payload === "All") {
                return {
                  ...state,
                  videoGames: [...state.allVideoGames],
                };
              }
        
              let currentVideogames;
              const aux = [...state.videoGames];
              if (action.payload === "A - Z") {
                aux.sort((a, b) => (a.name < b.name ? -1 : 1));
                currentVideogames = aux;
              }
              if (action.payload === "Z - A") {
                aux.sort((a, b) => (a.name > b.name ? -1 : 1));
                currentVideogames = aux;
              }
              return {
                ...state,
                videoGames: currentVideogames,
                order: { ...state.order, alphabeticalOrder: action.payload },
              };
        case ORDER_RATING:
            if (action.payload === "All") {
                return {
                  ...state,
                  videoGames: [...state.allVideoGames],
                };
              }
        
              let currentVideogames2;
              const aux2 = [...state.videoGames];
              if (action.payload === "Min") {
                aux2.sort((a, b) => (a.rating < b.rating ? -1 : 1));
                currentVideogames2 = aux2;
              }
              if (action.payload === "Max") {
                aux2.sort((a, b) => (a.rating > b.rating ? -1 : 1));
                currentVideogames2 = aux2;
              }
              return {
                ...state,
                videoGames: currentVideogames2,
                order: { ...state.order, orderByRating: action.payload },
              };

        case POST_VIDEOGAMES:
            //console.log(action.payload)
            return{
                ...state,
                videoGames:[...state.videoGames, action.payload]
            }
        case DELETE_VIDEOGAME:
            return{
                ...state
            }
            default:
                return {...state};
    }
}

export default rootReducer;