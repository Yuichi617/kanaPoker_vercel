import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

// initilize STATE
const initialState = {
  name: '',
  keyword: '',
  card_id: [0,0,0,0,0],
  arrange_card_id: []
}

// REDUCERS
function reducer (state=initial, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                name: action.name,
                keyword: state.keyword,
                card_id: state.card_id,
                arrange_card_id: state.arrange_card_id,
                playing: state.playing
            };

        case 'SET_KEYWORD':
            return {
                name: state.name,
                keyword: action.keyword,
                card_id: state.card_id,
                arrange_card_id: state.arrange_card_id,
                playing: state.playing
            };
        
        case 'SET_CARD_ID':
            return {
                name: state.name,
                keyword: state.keyword,
                card_id: action.card_id,
                arrange_card_id: state.arrange_card_id,
                playing: state.playing
            }

        case 'SET_ARRANGE_CARD_ID':
            return {
                name: state.name,
                keyword: state.keyword,
                card_id: state.card_id,
                arrange_card_id: action.arrange_card_id,
                playing: state.playing
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

export function SetArrangeCardId(array) {
    return {
        type: 'SET_ARRANGE_CARD_ID',
        arrange_card_id: array
    }
}

export function initStore(state=initialState) {
    return createStore(reducer, state, applyMiddleware(thunkMiddleware))
}