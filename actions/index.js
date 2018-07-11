export const RECEIVE_DECK_LIST = 'RECEIVE_DECK_LIST'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const SAVE_DECK = 'SAVE_DECK'
export const SAVE_CARD = 'SAVE_CARD'

export function receiveDeckList() {
    return {
        type: RECEIVE_DECK_LIST,
    }
}

export function receiveDeck(id) {
    return {
        type: RECEIVE_DECK,
        id,
    }
}

export function saveDeck(title) {
    return {
        type: SAVE_DECK,
        title,
    }
}

export function saveCard(title, card) {
    return {
        type: SAVE_CARD,
        title,
        card,
    }
}