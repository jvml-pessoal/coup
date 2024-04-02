import Deck from "./deck.js"
import GameManager from "./gamemanager.js"

const startButton = document.querySelector('.start-button')
const resetButton = document.querySelector('.reset-button')
const nextButton = document.querySelector('.next-button')
const playArea = document.querySelector('.play-area')
const cards = document.getElementsByClassName('card')

let initialDeck, match, gameRunning = false;
const playerElements = [];

startButton.addEventListener('click', () => {
    if (gameRunning) {
        return
    }
    let players = ['jv', 'mf']
    initialDeck = new Deck()
    match = new GameManager(players, initialDeck)
    gameRunning = true
    match.doSetup()
    match.startTurn()
    refreshPlayArea()
    makeCardsFlipabble()
})

resetButton.addEventListener('click', () => {
    playArea.innerHTML = '';
    gameRunning = false
})

nextButton.addEventListener('click', () => {
    // match.players[0].hand[0].flip()
    match.startTurn()
    match.targetPlayerIndex = 1
    match.doAction('steal')
    refreshPlayArea()
    match.nextPlayer()
})

function makeCardsFlipabble() {
    for (let i = 0; i < cards.length; i++) {
        const cardElement = cards[i]
        const card = findCardByIndex(i)
        cardElement.addEventListener('click', () => {
            card.flip()
            refreshPlayArea()
            makeCardsFlipabble()
        })
    }
}

function findCardByIndex(i) {
    return match.players[Math.floor(i/2)].hand[i%2]
}

function refreshPlayArea() {
    playArea.innerHTML = ''
    for (let i = 0; i<match.players.length; i++) {
        const playerElement = match.players[i].getHTML()
        playArea.appendChild(playerElement)
        playerElements.push(playerElement)
    }
}