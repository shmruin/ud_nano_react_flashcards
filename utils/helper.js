import { fetchDecksResult, submitDeck, submitCard, fetchRemoveDeck, fetchRemoveCard, fetchClearNotification, fetchSetCreateNotification } from './api'

export const DECKS_STORAGE_KEY = 'Flashcards:decks'
export const NOTIFICATION_KEY = 'Flashcards:notifications'

//return all of the decks along with their titles, questions, and answers. 
export function getDecks() {
    return fetchDecksResult()
}

//take in a single id argument and return the deck associated with that id. 
export function getDeck(id) {
    return fetchDeckResult(id)
}

//take in a single title argument and add it to the decks. 
export function saveDeckTitle(title) {
    return submitDeck(title)
}

//take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(id, card, callback) {
    return submitCard(id, card, callback)
}

//remove a deck
export function removeDeck(id, callback) {
    return fetchRemoveDeck(id, callback)
}

//remove a card
export function removeCard(id, cardidx, callback) {
    return fetchRemoveCard(id, cardidx, callback)
}

//clear all notifications
export function clearNotification() {
    return fetchClearNotification()
}

//create & set a notification
export function setNotification() {
    return fetchSetCreateNotification()
}

