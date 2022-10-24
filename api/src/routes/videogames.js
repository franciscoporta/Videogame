const {getVideoGames, getVideoGamesByName, postVideogames} = require('../controllers')
// const {Videogame} = require('../db.js')

const router = require('express').Router();
 
router.get('/', async (req, res) => {
    const { name } = req.query
    // const callInfo = await getVideoGames();
    // const callInfoName = await getVideoGamesByName(game)
    try {
        if(name){
            // console.log(name)
            const call = await getVideoGamesByName(name)
            res.status(201).json(call)
        }
            res.status(201).json(await getVideoGames())
        
            
    } catch (error) {
        console.log(error)
    }
  
})

router.post('/', async (req, res) => {
    const {name, description, released, rating, platforms, inDB, genres} = req.body;
    try {
        if (!name || !description || !platforms) return res.status(404).send("Falta enviar datos obligatorios")
        const info = await postVideogames(name, description, released, rating, platforms, inDB, genres)
        res.status(201).send(info)
    } catch (error) {
        console.log(error)
    }
//     if(name){
//         res.status(201).json(await postVideogames(name, description, data_added, rating, plataforms, inDB, genres))
//     } else{
//         return 'Debe ingresar un nombre'
//     }
})

// router.delete('/:idVideogame', async (req,res) => {
//     const {idVideogame} = req.params;
//     try {
//         let videogame = await Videogame.findByPk(idVideogame) // buscamos el juego por id en nuestra DB 
//         await videogame.destroy() // eliminamos el registro utilizando método destroy
//         // await Videogame.destroy({
//         //     where:{idVideogame}
//         // })
//         res.status(201).json('Videogame deleted')
//     } catch (error) {
//         console.log(error)
//     }
// })





module.exports = router;