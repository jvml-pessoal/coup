export default class Action {
    constructor(type, card=null, executeCallback) {
        this.type = type;
        this.card = card;
        this.executeCallback = executeCallback;
    }

    execute() {
        this.executeCallback();
    }
}