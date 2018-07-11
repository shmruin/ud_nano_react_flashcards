import { fetchDecksResult, submitDeck, submitCard } from './api'

export const DECKS_STORAGE_KEY = 'Flashcards:decks'

//return all of the decks along with their titles, questions, and answers. 
export function getDecks() {
    return fetchDecksResult()
}

//take in a single id argument and return the deck associated with that id. 
export function getDeck(id) {
    
}

//take in a single title argument and add it to the decks. 
export function saveDeckTitle(title) {
    return submitDeck(title)
}

//take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, card) {
    return submitCard(title, card)
}
