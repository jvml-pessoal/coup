import Player from "./player.js"
import Action from "./action.js"

export default class GameManager {
    constructor(playersNicks, deck, actions) {
        this.playersNicks = playersNicks
        this.deck = deck
        this.players = []
        this.currentPlayerIndex = 0
        this.targetPlayerIndex = null
        this.actions = {} 
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex]
    }

    getTargetPlayer() {
        return this.players[this.targetPlayerIndex]
    }

    getCurrentPlayerIndex() {
        return this.currentPlayerIndex
    }
    
    getTargetPlayerIndex() {
        return this.targetPlayerIndex
    }

    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length
        this.startTurn()
    }

    startTurn() {
        const player = this.getCurrentPlayer()
        for (let i = 0; i<player.hand.length; i++) {
        //    player.hand[i].flip()
        }
        console.log(`${player.nick}'s turn`)
    }

    doSetup() {
        this.deck.shuffle()
        for (let i = 0; i < this.playersNicks.length; i++) {
            let newPlayer = new Player(i, this.playersNicks[i])
            newPlayer.coins = 2
            newPlayer.drawCards(this.deck, 2)
            this.players.push(newPlayer)
            console.log(newPlayer.nick)
            console.log(newPlayer.hand)
        }
        this.createActions()
    }

    createActions() {
        const incomeAction = new Action("Income", null, () => {
            const currentPlayer = this.getCurrentPlayer();
            currentPlayer.coins += 1;
        });
        this.actions['income'] = incomeAction

        const foreignAidAction = new Action("Foreign Aid", null, () => {
            const currentPlayer = this.getCurrentPlayer();
            currentPlayer.coins += 2;
        });
        this.actions['foreign_aid'] = foreignAidAction;
        
        const taxAction = new Action("Tax", "Duke", () => {
            const currentPlayer = this.getCurrentPlayer();
            currentPlayer.coins += 3;
        });
        this.actions['tax'] = taxAction 

        const assassinateAction= new Action("Assassinate", "Assassin", () => {
            const currentPlayer = this.getCurrentPlayer();
            const targetPlayer = this.getTargetPlayer();
            currentPlayer.coins -= 3;
            targetPlayer.coins = 0 //to do
        });
        this.actions['assassinate'] = assassinateAction

        const stealAction = new Action("Steal", "Captain", () => {
            const currentPlayer = this.getCurrentPlayer();
            const targetPlayer = this.getTargetPlayer();
            currentPlayer.coins += 2;
            targetPlayer.coins -= 2;
            console.log(currentPlayer)
            console.log(targetPlayer)
        });
        this.actions['steal'] = stealAction 

        const exchangeAction = new Action("Exchange", "Ambassador", () => {
            const currentPlayer = this.getCurrentPlayer();
            currentPlayer.drawCards(this.deck, 2)
        });
        this.actions['exchange'] = exchangeAction 
    }

    doAction(actionType) {
        const action = this.actions[actionType]
        if (action) {
            action.execute()
        } else {
            console.error(`Action '${actionType}' not found.`)
        }
    }
}
