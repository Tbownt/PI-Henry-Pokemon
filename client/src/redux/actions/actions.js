import axios from 'axios'
 
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_TYPE = "GET_POKEMON_BY_TYPE";
export const CREATE_POKEMON = "CREATE_POKEMON";

export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';

export const CLEAR_STATE = 'CLEAR_STATE';
export const RESET_FILTER = 'RESET_FILTER';


export const getAllPokemons = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/pokemons')
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: response.data
            });
        } catch (error) {
            return console.log("Something went wrong. Please try again.", error.message)
        }
    };
};

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: response.data,
            });
        } catch (error) {
            return console.log("Not found", error.message)
        }
    };
};

export const getPokemonById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: response.data,
            });
        } catch (error) {
            return console.log("Im just using another Route to render this.")
        }
    };
};

export const getPokemonTypes = () => {
    return async function(dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/types')
            return dispatch({
                type: GET_POKEMON_BY_TYPE,
                payload: response.data,
            })
        } catch (error) {
            return console.log("Something went wrong. Please try again.", error.message)
        }
    };
};

export const createPokemon = (pokemon) => {
    return async function(dispatch) {
        try {
            const create = await axios.post('http://localhost:3001/pokemons', pokemon)
            return create
        } catch (error) {
            return console.error("I couldn't create that Pokemon. Please try again with a different name.", error.message)
        }
    };
};


export const orderByName = (name) => {
    return {
        type: ORDER_BY_NAME,
        payload: name,
    };
};

export const orderByAttack = (order) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: order,
    };
}; 


export const filterByType = (filter) => {
    return {
        type: FILTER_BY_TYPE,
        payload: filter,
    };
};

export const filterByCreated = (filter) => {
    return {
        type: FILTER_BY_CREATED,
        payload: filter,
    };
};


export const resetState = () => {
    return {type: CLEAR_STATE}
}


