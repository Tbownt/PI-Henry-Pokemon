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

    //Ordenamientos

    case ORDER_BY_NAME: 
        let allPokemons = state.pokemons;
            let sortedName = action.payload === 'asc' ?
                allPokemons.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                }) :
                allPokemons.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            return {
                ...state,
                pokemons: sortedName
            };   
    
    case ORDER_BY_ATTACK:
        const orderAttack = action.payload 
        if(orderAttack === 'AttackAsc')
            return {
                ...state,
                pokemons:  state.pokemons.sort((a, b) =>  b.attack - a.attack)
            }
        else if(orderAttack === 'AttackDesc')
            return {
                ...state,
                pokemons: state.pokemons.sort((a, b) => a.attack - b.attack)
            } 
        else {
            return {
                ...state
            }
        }
            
     

    //Filtros

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
       
       let created = state.pokemons.filter(p => typeof p.id === 'string');
       let api = state.pokemons.filter(p => typeof p.id === 'number');
       if(action.payload === "created") {
        return {
            ...state, pokemons: created
        }
       } else if (action.payload === "api") {
        return {
            ...state, pokemons: api
        }
       } 
       break;
    case RESET_FILTER: 
    return {
        ...state, pokemons: []
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