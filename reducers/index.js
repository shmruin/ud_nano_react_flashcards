import { RECEIVE_DECK_LIST, RECEIVE_DECK, SAVE_DECK, SAVE_CARD } from '../actions'

function reducer(state={}, action) {
    switch(action.type) {
        case RECEIVE_DECK_LIST:
            return state
        case RECEIVE_DECK:
            return state[action.id]
        case SAVE_DECK:
            return {
                ...state,
                [title]: []
            }
        case SAVE_CARD:
            return {
                ...state,
                [title]: [
                    ...state[title],
                    card
                ]
            }
    }
}

export default reducer