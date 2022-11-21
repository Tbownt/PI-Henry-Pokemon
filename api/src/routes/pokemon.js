const { Router } = require('express');
const router = Router();
const {Pokemon, Type} = require('../db');
const axios = require('axios');
const { Op } = require("sequelize");
// const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
   const {
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      type1,
      type2,
   } = req.body;
   

   let {name} = req.body;
   name.toLowerCase(); //me aseguro de que el name que se pase este en minusculas
      if (!name || name.trim() === "") {
      return res.status(400).send("Name is required.");
      }
      //Pregunto si existe un name o si esta vacio quitanlo los espacios sobrantes
     let types = ["unknown"];
     if (!type1 && !type2) {
       types = ["unknown"];
     } else if (type1 && !type2) {
       types = [type1];
     } else if (type2 && !type1) {
       types = [type2];
     } else {
       types = [type1, type2];
     }
     //Sino hay un tipo en el que se le pasa por body se asigna uno por default
 try {
   const exists = await Pokemon.findOne({
      where: {name: name.trim().toLowerCase()}
   });
   //Busco por nombre quitanle espacios y en minusculas

   if(exists) return res.status(400).send("There's a Pokemon already with that name.");

   let newPokemon = await Pokemon.create({
      name: name.trim().toLowerCase(),
      hp,
      attack, 
      defense,
      speed,
      height,
      weight,
      image,
      createdInDb: true,
   });

   let assignTypes = await Promise.all(
      types.map((type) => Type.findOne({ where: { name: type } }))
    );
    //Tengo que buscar en mi DB el o los type que coincida con el pokemon que voy a crear

   newPokemon.setTypes(assignTypes);
   //y a mi nuevo pokemon se los seteo
   
   return res.status(201).send(`The Pokemon named: ${newPokemon.name[0].toUpperCase() + newPokemon.name.substring(1)} has been created succesfully.`);

 } catch (error) {
   res.status(400).send(error.message);
 }
   
});


router.get('/', async (req, res) => {
 const {name} = req.query;

 try {
        
  if(!name) {

 let pokemonsFromDB = await Pokemon.findAll({include: Type});
 let dataFromDB = pokemonsFromDB?.map((element) => {
   return {
      id: element.id,
      name:
      element.name.trim().toLowerCase().charAt(0).toUpperCase() +
      element.name.substring(1), //me traigo su name con el fin de que quede asi = EJEMPLO: "andres" -> "Andres"
      hp: element.hp,
      attack: element.attack,
      defense: element.defense,
      speed: element.speed,
      height: element.height,
      weight: element.weight,
      types: element.Types.map((index) => index.name), //Aqui pido que me traiga los nombres de sus type de la db
      image: element.image,
      createdInDb: true,
   }
 });

 const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0")
 const response = api.data.results?.map(elemento => axios.get(elemento.url))
 const responseAPI = await axios.all(response)
 const dataFromAPI = responseAPI?.map((info) => {
    return {
        id: info.data.id,
        name: info.data.name,
        hp: info.data.stats[0].base_stat,
        attack: info.data.stats[1].base_stat,
        defense: info.data.stats[2].base_stat,
        speed: info.data.stats[5].base_stat,
        height: info.data.height,
        weight: info.data.weight,
        types: info.data.types.map((t) => t.type.name),
        image: info.data.sprites.other["official-artwork"]['front_default'],
        createdInDb: false,
    }
 });
 
 let getAllPokemons = dataFromAPI.concat(dataFromDB); //agrego todos los pokemons(tanto los de la api como los de la db) a un arreglo y lo envio

 res.status(200).send(getAllPokemons);
} else {
  try {
    let found = await Pokemon.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } }, //con el operador iLike busco por name sin problemas de keysensitive 
      include: { model: Type, attributes: ["name"] }
    })
    if(found) {
      let queryFromDB = {
      id: found.id,
      name: found.name,
      hp: found.hp,
      attack: found.attack,
      defense: found.defense,
      speed: found.speed,
      height: found.height,
      weight: found.weight,
      types: found.Types.map(i => i.name),
      image: found.image,
      createdInDb: true,
      } 
      return res.status(200).send(queryFromDB); //retorno mi pokemon una vez encontrado en la db
    } else {

   
   
    let pokemonByNameAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    let queryFromAPI =  {
          id: pokemonByNameAPI.data.id,
          name: pokemonByNameAPI.data.name,
          hp: pokemonByNameAPI.data.stats[0].base_stat,
          attack: pokemonByNameAPI.data.stats[1].base_stat,
          defense: pokemonByNameAPI.data.stats[2].base_stat,
          speed: pokemonByNameAPI.data.stats[5].base_stat,
          height: pokemonByNameAPI.data.height,
          weight: pokemonByNameAPI.data.weight,
          types: pokemonByNameAPI.data.types.map((t) => t.type.name),
          image: pokemonByNameAPI.data.sprites.other["official-artwork"]['front_default'],
          createdInDb: false,
      }
   
   return res.status(200).send(queryFromAPI); //Si el pokemon buscado por query esta en la api, lo devuelvo
  } 
  } catch (error) {
    res.status(404).send("I couldn't find any Pokemon with that name")
  }
}
} catch (error) {
   res.status(404).send(error.message)    
}
})

router.get("/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;

  if (idPokemon.length > 4) {
    try {
      const dbPokemonID = await Pokemon.findOne({
        where: {
          id: idPokemon,
        },
        include: {
          model: Type,
          attributes: ["name"],
        },
      });

      const formatIDpokemon = {
        id: dbPokemonID.id,
        name:
        dbPokemonID.name.trim().toLowerCase().charAt(0).toUpperCase() +
        dbPokemonID.name.substring(1),
        hp: dbPokemonID.hp,
        attack: dbPokemonID.attack,
        defense: dbPokemonID.defense,
        speed: dbPokemonID.speed,
        height: dbPokemonID.height,
        weight: dbPokemonID.weight,
        types: dbPokemonID.Types.map((t) => t.name),
        image: dbPokemonID.image,
        createdInDb: true,
      };

      if (dbPokemonID) return res.status(200).json(formatIDpokemon);
    } catch (error) {
      return res.status(404).send("No se encontró un Pokemon con ese ID");
    }
  }

  try {
    const apiPokemonID = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    );
    const matchedPokemon = {
      id: apiPokemonID.data.id,
      name: apiPokemonID.data.name,
      hp: apiPokemonID.data.stats[0].base_stat,
      attack: apiPokemonID.data.stats[1].base_stat,
      defense: apiPokemonID.data.stats[2].base_stat,
      speed: apiPokemonID.data.stats[5].base_stat,
      height: apiPokemonID.data.height,
      weight: apiPokemonID.data.weight,
      types: apiPokemonID.data.types.map((t) => t.type.name),
      image: apiPokemonID.data.sprites.other["official-artwork"]['front_default'],
      createdInDb: false,
    };

    return res.status(200).json(matchedPokemon);
  } catch (error) {
    res.status(404).send("I couldn't find any Pokemon that match with that ID");
  }
});


module.exports = router;