export default class Player {
    constructor(number, nick) {
        this.number = number
        this.nick = nick
        this.coins = 0
        this.hand = [] 
    }

    getHTML() {
        const playerDiv = document.createElement('div')
        playerDiv.innerText = `Player: ${this.nick}\nCoins: ${this.coins}`
        playerDiv.classList.add("player")
        playerDiv.style.backgroundColor = "#CCDFDF"
        playerDiv.appendChild(this.hand[0].getHTML())
        playerDiv.appendChild(this.hand[1].getHTML())
        return playerDiv
    }

    drawCards(deck, quant) {
        for (let i = 0; i < quant; i++) {
            if (deck.numberOfCards > 0) {
                this.hand.push(deck.cards.shift());
            } else {
                console.log("Não há mais cartas no deck.");
                break;
            }
        }
    }
}