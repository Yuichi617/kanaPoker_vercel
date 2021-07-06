import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

// initilize STATE
const initialState = {
  name: '',
  keyword: '',
  card_id: [0,0,0,0,0]
}

// REDUCERS
function reducer (state=initial, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                name: action.name,
                keyword: state.keyword,
                card_id: state.card_id
            };

        case 'SET_KEYWORD':
            return {
                name: state.name,
                keyword: action.keyword,
                card_id: state.card_id
            };
        
        case 'SET_CARD_ID':
            return {
                name: state.name,
                keyword: state.keyword,
                card_id: action.card_id
            }
        default:
            return state;
    }
}

// ACTION CREATOR
export function SetName(text) {
    return {
        type: 'SET_NAME',
        name: text
    }
}

export function SetKeyword(text) {
    return {
        type: 'SET_KEYWORD',
        keyword: text
    }
}

export function SetCardId(array) {
    return {
        type: 'SET_CARD_ID',
        card_id: array
    }
}

export function initStore(state=initialState) {
    return createStore(reducer, state, applyMiddleware(thunkMiddleware))
}