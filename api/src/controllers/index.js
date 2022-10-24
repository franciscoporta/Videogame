const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
// const {
//     API_KEY
// } = process.env;



const getVideoGames = async () => {
    let videogames = [];
    let url =`https://api.rawg.io/api/games?key=341a990317ce4e5cb7255ee631f366aa`;
        for(let i = 0; i < 5; i++){
            let callApi = await axios.get(url)
            callApi?.data.results.map((game) => {
                videogames.push({
                    id: game.id,
                    name: game.name,
                    img: game.background_image,
                    rating: game.rating,
                    platforms: game.platforms.map(p => p.platform.name),
                    genres: game.genres?.map(g => g.name),
                })
            })
            url = callApi.data.next
        }
        
    
    let callDB = await Videogame.findAll({
        attributes:['id', 'name', 'description', 'released', 'rating', 'platforms', 'inDB'],
        include:{
            model: Genre,
            attributes:['name'],
            through: {
                attributes: [],
              },
        }
    })

    
    callDB = callDB.map(g => {
        return {
            ...g.dataValues, 
            genres: g.genres?.map(g => g.name)
        }})


        // console.log(callDB)
   
    const infoFinal = [...videogames, ...callDB];
    return infoFinal
 }

const getVideoGamesByName = async (name) => {
    let videoGameByName = [];
    try {

        let callDB = await Videogame.findAll({
            where:{
                name: name
            },
            attributes:['id', 'name', 'description', 'released', 'rating', 'platforms', 'inDB'],
            include:{
                model: Genre,
                attributes:['name'],
                through: {
                    attributes: [],
                  },
            }
        })
    
        callDB = callDB.map(g => {
            return {
            ...g.dataValues, 
            genres: g.genres?.map(g => g.name)
        }})

        callDB.map((ele) => videoGameByName.push(ele))
        //videoGameByName.push(callDB);

        let callApi = await axios.get(`https://api.rawg.io/api/games?key=341a990317ce4e5cb7255ee631f366aa&search=${name}`)
        
        callApi = callApi?.data.results.map((game) => {
            videoGameByName.push({
                id: game.id,
                name: game.name,
                img: game.background_image,
                rating: game.rating,
                genres: game.genres?.map(g => g.name),
                platforms: game.platforms.map(p => p.platform.name),
            })
        })
        
        return videoGameByName.slice(0, 15)

    } catch (error) {
        console.log(error)
    }
}

//const getVideoGamesByNameinApiOrDB = async (name) => {

        //name = name.toLowerCase();

//     let callDB = await Videogame.findAll({
//         where:{
//             name: name
//         },
//         attributes:['id', 'name', 'description', 'released', 'rating', 'platforms', 'inDB'],
//         include:{
//             model: Genre,
//             attributes:['name'],
//             through: {
//                 attributes: [],
//               },
//         }
//     })

//     callDB = callDB.map(g => {
//         return {
//         ...g.dataValues, 
//         genres: g.genres?.map(g => g.name)
//     }})

//     if(!callDB[0]) return await getVideoGamesByName(name)
//     return callDB //ES PORQUE EL findAll DEVUELVE UN ARRAY NOCIERTO?
//     //PORQUE callDB[0] SI FUNCIONA Y callDB NO FUNCIONA??
// }

//BUSQUEDA DE JUEGITO X ID -> LLEGA X PARAMS
const getVideoGameByID = async (id) => {
    const callApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=341a990317ce4e5cb7255ee631f366aa`)

    const infoFinal = {
                id: callApi.data.id,
                name: callApi.data.name,
                img: callApi.data.background_image,
                rating: callApi.data.rating,
                genres: callApi.data.genres?.map(g => g.name),
                description: callApi.data.description_raw,
                released: callApi.data.released,
                platforms: callApi.data.platforms?.map(el => el.platform.name)
    }

    return infoFinal
}


const getVideoGameByIDinDBorApi = async (id) => {
    if(id.length > 5){
        try {
            let callDB = await Videogame.findByPk(id, {
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                },
            });

            const callDBFinal = {
                name: callDB.dataValues.name,
                description: callDB.dataValues.description,
                image: callDB.dataValues.image,
                released: callDB.dataValues.released,
                rating: callDB.dataValues.rating,
                platforms: callDB.dataValues.platforms,
                genres: callDB.dataValues.genres.map((g) => g.name),
            };
         
            return callDBFinal;
        } catch (error) {
            console.log(error)
        }
    } else {
        return getVideoGameByID(id)
    }
}

const getGenres = async () => {
   
    let callDB = await Genre.findAll();
    
    if(callDB.length === 0){
        const callApi = await axios.get(`https://api.rawg.io/api/genres?key=341a990317ce4e5cb7255ee631f366aa`);

        let infoApi = await callApi.data.results.map( (g) => {
            return {
                name: g.name
            }
        })

        infoApi = await Genre.bulkCreate(infoApi);
    }

    return callDB;
}


const postVideogames = async (name, description, released, rating, platforms, inDB, genres) => {
    //console.log(genre)
    //name = name.toLowerCase();

    try {
        let newVideoGame = await Videogame.create({
            name, 
            description, 
            released, 
            rating, 
            platforms, 
            inDB
        });
                             
        let findGenre = await Genre.findAll({
            where:{
                name: genres
            }
        })
        
        await newVideoGame.addGenre(findGenre)

        let vG = await Videogame.findByPk(newVideoGame.id,{
            include:{
                model: Genre,
                attributes:['name'],
                through: {
                    attributes: [],
                },
            }
        }
       );

       const callDBFinal = {
        id:vG.id,
        name: vG.dataValues.name,
        description: vG.dataValues.description,
        image: vG.dataValues.image,
        released: vG.dataValues.released,
        rating: vG.dataValues.rating,
        platforms: vG.dataValues.platforms,
        genres: vG.dataValues.genres.map((g) => g.name),
        inDB:vG.dataValues.inDB
    };
                
        console.log('callDBFinal',callDBFinal)

        return callDBFinal

    } catch (error) {
        console.log(error)
    }
}



module.exports={
    getVideoGames,
    getVideoGamesByName,
    getVideoGameByIDinDBorApi,
    getGenres,
    postVideogames
}




