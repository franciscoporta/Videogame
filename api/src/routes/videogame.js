const { getVideoGameByIDinDBorApi } = require('../controllers');
const {Videogame, Genre} = require('../db.js')

const router = require('express').Router();

router.get('/:idVideogame', async (req, res) => {
    const {idVideogame} = req.params;
    try {
        const info = await getVideoGameByIDinDBorApi(idVideogame)
        if(info){
            res.status(201).json(info)
        }
    } catch (error) {
        console.log(error) 
    }
})

router.delete('/:idVideogame', async (req,res) => {
    const {idVideogame} = req.params;
    try {
        let videogame = await Videogame.findByPk(idVideogame) // buscamos el juego por id en nuestra DB 
        await videogame.destroy() // eliminamos el registro utilizando método destroy
        // await Videogame.destroy({
        //     where:{idVideogame}
        // })
        res.status(201).json('Videogame deleted')
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req, res) =>{
    const {id} = req.params;
    const {
        name, 
        description, 
        released, 
        rating, 
        platforms, 
        inDB, 
        genres
    } = req.body //me descructuro todo lo que me llega por body
    // console.log(id)

    try {
        
        let videogame = await Videogame.findByPk(id) //aca tengo mi juego buscado por id
        // if (!name || !description || !platforms) return res.status(404).send("Falta enviar datos obligatorios")
        if(videogame){

            await videogame.update({
                name, 
                description, 
                released, 
                rating, 
                platforms: platforms?.map((p) => p), 
                inDB, 
                genres: genres.map((g) => g.name)
            },
            { where: { id: id }})


            let findGenre = await Genre.findAll({
                where:{
                    name: genres
                }
            })

            let genreFinal = findGenre.map((g) => g.name)

            await videogame.addGenre(findGenre)
            

            let vG = await Videogame.findByPk(videogame.id,{
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
            genres: genreFinal,
            inDB:vG.dataValues.inDB
        };
    
        return callDBFinal
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;