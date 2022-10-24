const { getGenres } = require('../controllers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const callInfo = await getGenres();
    try {
        if(callInfo) return res.status(201).json(callInfo)
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;