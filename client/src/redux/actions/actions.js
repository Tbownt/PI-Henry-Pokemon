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
            return "Something went wrong. Please try again."
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
            return "Something went wrong. Please try again."
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
            return "Something went wrong. Please try again."
        }
    };
};

export const createPokemon = (pokemon) => {
    return async function(dispatch) {
        try {
            const create = await axios.post('http://localhost:3001/pokemons', pokemon)
            return dispatch({
                type: CREATE_POKEMON,
                payload: create,
            });
        } catch (error) {
            return "Something went wrong. Please try again."
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
            return "Something went wrong. Please try again."
        }
    };
};


export const orderByAttack = (order) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: order,
    };
}; 

export const orderByName = (name) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: name,
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

export const resetFilter = () => {
    return {type: RESET_FILTER}
}
export const resetState = () => {
    return {type: CLEAR_STATE}
}


