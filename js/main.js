/*----- constants -----*/

const ambience = new Audio('');
const shuffSound = new Audio('');
const dealSound = new Audio('');

const PLAYERS = {
    '0' : {
        name: 'Dealer',
        cards: [],
        hiddenCard: []
    },
    '1' : {
        name: 'Player',
        cards: []
    },
};

let faces = [ '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
let suits = ['s', 'c', 'd', 'h'];
let masterDeck = getDeck();

/*----- app's state (variables) -----*/

let shuffledDeck;
let dealerDeck = PLAYERS[0].cards;
let playerDeck = PLAYERS[1].cards;
let dealerHiddenDeck = PLAYERS[0].hiddenCard;

/*----- cached element references -----*/

const deal = document.getElementById('reset-button');
const hit = document.getElementById('hit-button');
const stay = document.getElementById('stay-button');
const dlrScore = document.getElementById('dealer-score');
const plyrScore = document.getElementById('player-score');
let dlrModScore = document.getElementById('dealer-score');
let plyrModScore = document.getElementById('player-score');
const dlrContainer = document.getElementById('dealer-cards');
const plyrContainer = document.getElementById('player-cards');
const dlrStatus = document.getElementById('dealer-status');
const plyrStatus = document.getElementById('player-status');
const dlrStatContain = document.getElementById('dStatContainer');
const plyrStatContain = document.getElementById('pStatContainer');

/*----- event listeners -----*/

deal.addEventListener('click', startGame);
hit.addEventListener('click', nextCard);
stay.addEventListener('click', holdCards);

/*----- functions -----*/

function init () {
    dealerDeck = [];
    playerDeck = [];
    dealerHiddenDeck = [];
    dlrStatContain.style.visibility = 'hidden';
    plyrStatContain.style.visibility = 'hidden';
    hit.addEventListener('click', nextCard);
    stay.addEventListener('click', holdCards);
}

function getDeck(){
    let deck = [];
    suits.forEach(function(suit) {
        faces.forEach(function(face){
            deck.push({
                face: `${suit}${face}`,
                value: parseInt(face) || (face === 'A' ? 11 : 10),
                mod: parseInt(face) || (face === 'A' ? 1 : 10)
            });
        });
    });
    return deck;
}

function shuffleDeck() {
    let tempDeck = masterDeck.slice();
    shuffledDeck = [];
    while (tempDeck.length) {
        let rndIdx = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(rndIdx, 1) [0]);
    }
    return tempDeck;
}

function startGame(){
    init();
    if (dealerDeck.length < 2) {
        shuffleDeck();
        giveCards();
        renderBackCard();
        renderCards();
        dlrBlkJack(dealerDeck, dealerHiddenDeck, dlrStatus);
        plyrBlkJack(playerDeck, plyrStatus);
        renderTotal(playerDeck, plyrScore);
        dlrScore.innerText = reducedValue(dealerDeck);
        return;
    }
}

let giveCards = function () {
    if (PLAYERS[0].cards.length === 0) {
        playerDeck.push(shuffledDeck.pop());
        dealerDeck.push(shuffledDeck.pop());
        playerDeck.push(shuffledDeck.pop());
        dealerHiddenDeck.push(shuffledDeck.pop());
    }
};

function renderCards() {
    renderCardToContainers(dealerDeck, dlrContainer);
    renderCardToContainers(playerDeck, plyrContainer);
}

function renderCardToContainers(deck, container) {
    container.innerHTML = '';
    let cardsHtml = deck.reduce(function(html, card){
        return html + `<div class="card ${card.face}"></div>`;
    }, '');
    container.innerHTML = cardsHtml;
}

function renderBackCard() {
    dealerDeck.push({
        face: 'back-blue',
        value: 0
    });
}

function removeBackCard() {
    dealerDeck.pop();
    dealerDeck.push(dealerHiddenDeck.pop());
}

function removeButtons() {
    hit.removeEventListener('click', nextCard);
    stay.removeEventListener('click', holdCards);
}
    
function reducedValue(deck){
    let total = deck.reduce((acc, cur) => {
        acc += cur.value;
        return acc;
    }, 0);
    return total;
}

function reducedModValue(deck){
    let modTotal = deck.reduce((acc, cur) => {
        acc += cur.mod;
        return acc;
    }, 0);
    return modTotal;
}

function checkForAce(deck) {
    let ace = false;
    deck.forEach(function (player) {
       if ( player.mod === 1 ) {
           ace = true;
       }
    });
    return ace;
}

function modifiedScore() {
    concatScore(dealerDeck);
    concatScore(playerDeck);
}

function concatScore(deck){
    let target = reducedValue(deck);
    let source = reducedModValue(deck);
    modScore = source + "/" + target;
    return modScore;
}

function renderTotal(deck, container) {
    if ( checkForAce(deck) === true ) {
        container.innerText = concatScore(deck);
    }
    else {
        container.innerText = reducedValue(deck);
    }
}

function nextCard() {  
    checkForAce(playerDeck);
    hitCard(playerDeck, plyrContainer);
    renderTotal(playerDeck,plyrScore);
    bustMove();
}

function hitCard(deck, container) {
    deck.push(shuffledDeck.pop());
    renderCardToContainers(deck, container);
    return;
}

function holdCards() {
    if (dealerDeck.length === 2 ) {
        removeBackCard();
        renderCardToContainers(dealerDeck, dlrContainer);
        renderTotal(dealerDeck, dlrScore);
        dealerLogic();
        bustMove();
        aPush(dealerDeck, playerDeck, dlrStatus, plyrStatus, dlrStatContain, plyrStatContain);
        twentyOneCheck();
        whosHigher(dealerDeck, playerDeck, dlrStatus, plyrStatus, dlrStatContain, plyrStatContain);
        hit.removeEventListener('click', nextCard);
    }
}

function dealerLogic() {
    aces();
    aces();
}

function aces() {
    if(checkForAce(dealerDeck) === true && reducedValue(dealerDeck) <= 16 && reducedModValue(dealerDeck) <= 6) {
        hitCard(dealerDeck, dlrContainer);
        renderTotal(dealerDeck, dlrScore);
        if(reducedValue(dealerDeck) > 21 || reducedModValue(dealerDeck) <= 16) {
            hitCard(dealerDeck, dlrContainer);
    }   else {
        return;
    }
    } else if (reducedValue(dealerDeck) < 17){
        hitCard(dealerDeck, dlrContainer);
        renderTotal(dealerDeck, dlrScore);
    }
}

function bustMove() {
    checkBust(dealerDeck, dlrStatContain, dlrStatus);
    checkBust(playerDeck, plyrStatContain, plyrStatus);
}

function checkBust(deck, container, message){
    if(checkForAce(deck) !== true && reducedValue(deck) > 21){
        bust(container, message);
    }
    else if (checkForAce(deck) === true && reducedModValue(deck) > 21){
        bust(container, message);
    } else if (checkForAce(deck) === true && reducedValue(deck) > 21){
        return;
    } else {
        return;
    }     
}

function bust(container,message) {
        message.innerText = 'BUST!';
        container.style.visibility = 'visible';
        removeButtons();
}

function twentyOneCheck(){
    twentyOne(playerDeck, plyrStatus, plyrStatContain);
    twentyOne(dealerDeck, dlrStatus, dlrStatContain);
}

function twentyOne(deck, message, container) {
    if (deck.length > 2 && reducedValue(deck) === 21 || reducedModValue(deck) === 21) {
        message.innerText = 'TWENTY ONE!';
        container.style.visibility = 'visible';
        removeButtons();
    }
}

function plyrBlkJack(deck, container) {
    let variation1 = (deck[0].value === 10 && deck[1].value === 11);
    let variation2 = (deck[0].value === 11 && deck[1].value === 10);
    if (variation1 || variation2) { 
        removeBackCard();
        renderCardToContainers(playerDeck, plyrContainer);
        dlrScore.innerText = reducedValue(dealerDeck);
        plyrScore.innerText = reducedValue(playerDeck);
        container.innerText = 'BLACKJACK!';
        plyrStatContain.style.visibility = 'visible';
        removeButtons();
    } 
    return;
}

function dlrBlkJack(deck, deck2, message) {
    let variation3 = (deck[0].value === 10 && deck2[0].value === 11);
    let variation4 = (deck[0].value === 11 && deck2[0].value === 10);
    if (variation3 || variation4) { 
        removeBackCard();
        renderCardToContainers(dealerDeck, dlrContainer);
        dlrScore.innerText = reducedValue(dealerDeck);
        plyrScore.innerText = reducedValue(playerDeck);
        message.innerText = 'BLACKJACK!';
        dlrStatContain.style.visibility = 'visible';
        removeButtons();
    } 
    return;
}

function whosHigher(deck1, deck2, message1, message2, container1, container2) {
    let scoreA = reducedValue(deck1);
    let scoreB = reducedValue(deck2);
    let scoreC = reducedModValue(deck1);
    let scoreD = reducedModValue(deck2);
    if (checkForAce(deck1) === true) {
        if(scoreA < 21 && scoreD < 21 && scoreA > scoreD ){
            message1.innerText = 'WINNER!';
            container1.style.visibility = 'visible';
            removeButtons();
        } else if (scoreB < 21 && scoreC < 21 && scoreB > scoreC) {
            message2.innerText = 'WINNER!';
            container2.style.visibility = 'visible';
            removeButtons();
        }
    } else if (scoreA < 21 && scoreB < 21 && scoreA > scoreB) {
        message1.innerText = 'WINNER!';
        container1.style.visibility = 'visible';
        removeButtons();
    } else if (scoreB < 21 && scoreA < 21 && scoreB > scoreA){
        message2.innerText = 'WINNER!';
        container2.style.visibility = 'visible';
        removeButtons();
    }
}

function aPush(deck1, deck2, message1, message2, container1, container2,){
    let scoreA = reducedValue(deck1);
    let scoreB = reducedValue(deck2);
    if (scoreA <= 21 && scoreB <= 21 && scoreA === scoreB) {
        message1.innerText = 'PUSH';
        container1.style.visibility = 'visible';
        message2.innerText = 'PUSH';
        container2.style.visibility = 'visible';
        removeButtons();
    }
}