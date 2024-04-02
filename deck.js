const CHARACTERS = [
    "Duke", "Assassin", "Captain", "Ambassador", "Contessa"
]

export default class Deck {
    constructor(cards = initialDeck()) {
        this.cards = cards
    }

    get numberOfCards() {
        return this.cards.length
    }

    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[j]
            this.cards[j] = this.cards[i]
            this.cards[i] = oldValue
        }
    }

    draw(player, quant) {
        for (let i = 0; i < quant; i++) {
            if (this.numberOfCards > 0) {
                player.hand.push(this.cards.shift());
            } else {
                console.log("Não há mais cartas no deck.");
                break;
            }
        }
    }
}

class Card {
    constructor(name, action, counteraction, symbol, upside = false) {
        this.name = name
        this.action = action
        this.counteraction = counteraction
        this.symbol = symbol
        this.upside = upside 
    }

    get color() {
        let color;
        switch (this.name) {
            case "Duke":
                color = '#E24973';
                break;
            case "Assassin":
                color = '#575755';
                break;
            case "Captain":
                color = '#62B2BF';
                break;
            case "Ambassador":
                color = '#A4AE4A';
                break;
            case "Contessa":
                color = '#CC412D';
                break;
            default:
                color = 'white';
                break;
        }
        return color
    }

    flip() {
        this.upside = !this.upside
    }

    getHTML() {
        const cardDiv = document.createElement('div')
        if (this.upside) {
            cardDiv.innerText = this.symbol
            cardDiv.style.backgroundColor = this.color
            cardDiv.classList.add("card")
            cardDiv.dataset.value = `${this.name}${this.symbol}`
        } else {
            cardDiv.innerText = "☡"
            cardDiv.style.backgroundColor = "black"
            cardDiv.classList.add("card")
        }
        return cardDiv
    }
}

function initialDeck() {
    const cards = [];
    CHARACTERS.forEach(character => {
        for (let i = 0; i < 3; i++) {
            let action, counteraction, symbol;
            switch (character) {
                case "Duke":
                    action = "Take 3 coins from the treasury.";
                    counteraction = "Block foreign aid.";
                    symbol = "♝"
                    break;
                case "Assassin":
                    action = "Pay 3 coins to assassinate another player's character.";
                    counteraction = "N/A";
                    symbol = "☠"
                    break;
                case "Captain":
                    action = "Steal 2 coins from another player.";
                    counteraction = "Block stealing.";
                    symbol = "⚔"
                    break;
                case "Ambassador":
                    action = "Exchange cards with the Court Deck.";
                    counteraction = "Block stealing.";
                    symbol = "⚖"
                    break;
                case "Contessa":
                    action = "N/A";
                    counteraction = "Block assassination.";
                    symbol = "♛"
                    break;
                default:
                    action = "N/A";
                    counteraction = "N/A";
                    symbol = "X"
            }
            const card = new Card(character, action, counteraction, symbol);
            cards.push(card);
        }
    });
    return cards;
}