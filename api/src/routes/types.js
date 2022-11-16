const { Router } = require('express')
const router = Router()
const {Pokemon, Type} = require('../db')
const axios = require('axios')

router.get('/', async (req, res) => {
    try {
        const api = await axios.get('https://pokeapi.co/api/v2/type');
        const apiData = api.data.results.map(type => type.name)
        const dbData = await Type.findAll({atributtes: ["id","name"]})
        
        if(dbData.length > 0) {
           return res.status(200).send(dbData);
        
        } else {
            apiData.forEach((t) => {
                Type.bulkCreate([{name: t.name}])
            })

            const allTypes = await Type.findAll({atributtes: ["id","name"]});
           
            return res.status(200).send(allTypes);
            //Para esta ruta utilice los datos de la api para guardar los tipos de Pokemon que hay
            //si la base de datos tiene elementos dentro, que los devuelva, sino
            //que los cree por medio de un bulkCreate dado el name de cada tipo de pokemon de la api
        }
        
    } catch (error) {
        res.status(404).send("There's no Pokemons with that Type");
    }
})


module.exports = router;