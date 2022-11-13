const { Router } = require('express')
const router = Router()
const {Pokemon, Type} = require('../db')
const axios = require('axios')
// const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize')

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
      if (!name || name.trim() === "") //Pregunto si existe un name o si esta vacio quitanlo los espacios sobrantes
       res.status(400).send("Name is required.");
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
   });

   let assignTypes = await Promise.all(
      types.map((type) => Type.findOne({ where: { name: type } }))
    );
    //Busco en el arreglo de types uno que coincida con los que estan almacenados en la DB

   newPokemon.setTypes(assignTypes);
   //y en esta funcion se la asigno
   
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
    }
 });
 
 let getAllPokemons = dataFromAPI.concat(dataFromDB); //agrego todos los pokemons(tanto los de la api como los de la db) a un arreglo y lo envio

 res.status(200).send(getAllPokemons);
} else {
  let pokemonByNameDB = await Pokemon.findAll({
    where: {name: {[Op.iLike]: `%${name}%`}}, //Gracias al operador iLike busco por name sin problemas de keysensitive 
    include: { model: Type, attributes: ["name"] }
  })

  let queryFromDB = pokemonByNameDB.map((element) => {
    return {
       id: element.id,
       name:
       element.name.trim().toLowerCase().charAt(0).toUpperCase() +
       element.name.substring(1),
       hp: element.hp,
       attack: element.attack,
       defense: element.defense,
       speed: element.speed,
       height: element.height,
       weight: element.weight,
       types: element.Types.map((index) => index.name),
       image: element.image,
    }
  });
 if(queryFromDB.length > 0) {
  return res.status(200).send(queryFromDB); //aqui pregunto si mi base de datos contiene el name mediante el length y si lo tiene, lo envio
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
    }
 
 if(queryFromAPI.name) return res.status(200).send(queryFromAPI); //Si el pokemon buscado por query esta en la api, lo devuelvo
 res.status(404).send("There's no Pokemons with that name.")
}

}
} catch (error) {
   res.status(404).send(error.message)    
}
})

router.get('/:idPokemon', async (req, res) => {
const {idPokemon} = req.params;

 if(idPokemon.length > 4) {
  try {
    const idPokemonDB = await Pokemon.findByPk( idPokemon, {
      include: {
        model: Type, 
        attributes: ["name"],
      },
    });
//Para este caso en particular me fijo si el id pasado por params tiene mas de 4 digitos ya que son el maximo que tiene la api
//De ser este el caso, busca en la db
    const pokemonInfo = {
      id: idPokemonDB.id,
      name: idPokemonDB.name.trim().toLowerCase().charAt(0) +
      idPokemonDB.name.substring(1),
      hp: idPokemonDB.hp,
      attack: idPokemonDB.attack,
      speed: idPokemonDB.speed,
      height: idPokemonDB.height,
      weight: idPokemonDB.weight,
      types: idPokemonDB.Types.map((t) => t.name)
    };
    if(idPokemonDB) return res.status(200).send(pokemonInfo);
  } catch (error) {
    res.status(404).send("There's no Pokemons with that ID.")
  }
 }

 try {
  const idPokemonAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
  const pokemonFound = {
        id: idPokemonAPI.data.id,
        name: idPokemonAPI.data.name,
        hp: idPokemonAPI.data.stats[0].base_stat,
        attack: idPokemonAPI.data.stats[1].base_stat,
        defense: idPokemonAPI.data.stats[2].base_stat,
        speed: idPokemonAPI.data.stats[5].base_stat,
        height: idPokemonAPI.data.height,
        weight: idPokemonAPI.data.weight,
        types: idPokemonAPI.data.types.map((t) => t.type.name),
        image: idPokemonAPI.data.sprites.other["official-artwork"]['front_default'],
  }
  return res.status(200).send(pokemonFound)

 } catch (error) {
  res.status(404).send("I couldn't find any Pokemon with that ID.");
 }
});


module.exports = router;