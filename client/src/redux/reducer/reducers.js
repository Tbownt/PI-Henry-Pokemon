import {
    CREATE_POKEMON,
     GET_ALL_POKEMONS,
     GET_POKEMON_BY_ID,
     GET_POKEMON_BY_NAME,
     GET_POKEMON_BY_TYPE,
     ORDER_BY_ATTACK,
     ORDER_BY_NAME,
     FILTER_BY_TYPE,
     FILTER_BY_CREATED,
     CLEAR_STATE,
     RESET_FILTER} 
     from '../actions/actions'

const initialState = {
    pokemons: [],
    pokemon: {},
    filters: [],
    types: []

}



const rootReducer = (state = initialState, action) => {
switch(action.type) {
    case GET_ALL_POKEMONS:
        return {
        ...state, pokemons: action.payload
        }
    case CREATE_POKEMON: 
         return {
        ...state, pokemons: state.pokemons.concat(action.payload)
        }
    case GET_POKEMON_BY_NAME:
        return {
            ...state, pokemon: action.payload
        }

    case GET_POKEMON_BY_ID: 
        return {
        ...state, pokemon: action.payload
    }    
    case GET_POKEMON_BY_TYPE: 
        return {
        ...state, types: action.payload
    }
    case ORDER_BY_NAME: 
        return {
        ...state,
    }
    case ORDER_BY_ATTACK:
        return {
            ...state
    }

    case FILTER_BY_TYPE: 
    let type = action.payload;
    const filteredBy = state.pokemons.filter(p=> p.types.includes(type))
    if(filteredBy.length > 0){
        return {
            ...state,
            pokemons: filteredBy
        }
    } else {
        return {
            ...state,
            pokemons: state.pokemons
        }
    }
    case FILTER_BY_CREATED:
        let created = state.pokemons.filter(p=> typeof p.id === 'string') //uuid
        let api = state.pokemons.filter(p=> typeof p.id === 'number') // api
        if(action.payload === created){
            return {
                ...state, pokemons: created
            }
        } else if (action.payload === api) {
            return {
                ...state, pokemons: api
            }
        } else {
            return {
                ...state, pokemons: state.pokemons
        }
        }
    case RESET_FILTER: 
    return {
        ...state, pokemons: state.pokemons
    }
    case CLEAR_STATE: 
    return {
        ...state, pokemon: {}
    }
    
    default: 
    return state
}
}

export default rootReducer