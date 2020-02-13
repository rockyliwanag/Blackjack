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
let totalDealerDeck = PLAYERS[0].cards.concat(PLAYERS[0].hiddenCard); //might not need this

/*----- cached element references -----*/

const deal = document.getElementById('reset-button');
const hit = document.getElementById('hit-button');
const stay = document.getElementById('stay-button');
const dlrScore = document.getElementById('dealer-score');
const plyrScore = document.getElementById('player-score');
const dlrModScore = document.getElementById('dealer-score');
const plyrModScore = document.getElementById('player-score');
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
        renderTotal();
        renderBackCard();
        renderCardToContainers(dealerDeck, dlrContainer);
        renderCardToContainers(playerDeck, plyrContainer);
        checkWinner();
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
    let face = "A";
    deck.includes(face);
    }
function renderTotal() {
    // if( check for ace){true: render mod total | false: render regular total}
   
    dlrScore.innerText = reducedValue(dealerDeck);
    plyrScore.innerText = reducedValue(playerDeck);
    // dlrModScore.innerText = reducedModValue(dealerDeck);
    // plyrModScore.innerText = reducedModValue(playerDeck);

    // dlrScore.innerText = dNum() ? "something" : "something else"
}

function nextCard() {
    hitCard(plyrScore, playerDeck, plyrContainer, plyrStatus, plyrStatContain);
    checkWinner();
    return;
}

function hitCard(score, deck, container, status, message) {
    if (score.innerText < 21) {
        deck.push(shuffledDeck.pop());
        renderCardToContainers(deck, container);
        renderTotal();
        checkWinner();
        return;
    }
}

function concatScore(score1, score2){
    let target = score1.innerText;
    let source = score2.innerText;
    dlrModScore = target + "/" + source;
    return concatScore;
}
 
// need a function to modify Ace card
    //need to give 2 totals one with value of 11+ and one with 1+ and concat 11+total with 1+total 11/1
// let aceCard = 
    //function that initializes dealer logic.

function holdCards() {
    if (dealerDeck.length <= 2 ) {
        removeBackCard();
        renderTotal();
        dealerLogic();
    }
    renderCardToContainers(dealerDeck, dlrContainer);
}

function checkWinner(){
    dlrBlkJack(dealerDeck, dealerHiddenDeck, dlrStatus);
    plyrBlkJack(playerDeck, plyrStatus);
    twentyOne(playerDeck, plyrScore, plyrStatus, plyrStatContain);
    twentyOne(dealerDeck, dlrScore, dlrStatus, dlrStatContain);
    bust(plyrScore, plyrStatContain, plyrStatus);
    bust(dlrScore, dlrStatContain, dlrStatus);
}

function bust(score,container,message) {
    if(score.innerText > 21) {
        message.innerText = 'BUST!';
        container.style.visibility = 'visible'
    }
}

// function blkJack(deck, container, deck2) {
//     let variation1 = (deck[0].value === 10 && deck[1].value === 11);
//     let variation2 = (deck[0].value === 11 && deck[1].value === 10);
//     let variation3 = (deck[0].value === 10 && deck2[0].value === 11);
//     let variation4 = (deck[0].value === 11 && deck2[0].value === 10);
//     if (variation1 || variation2 || variation3 || variation4) { 
//         removeBackCard();
//         renderCardToContainers(playerDeck, plyrContainer);
//         renderTotal();
//         container.innerText = 'BLACKJACK!';
//         plyrStatContain.style.visibility = 'visible';
//     } 
//     return;
// }

function twentyOne(deck, score, container1, container2) {
    if (deck.length > 2 && score.innerText === '21') {
        container1.innerText = 'TWENTY ONE!';
        container2.style.visibility = 'visible';
    }
}

function dealerLogic() {
    dealerCheckCard();
    dealerCheckCard();
    twentyOne(dealerDeck, dlrScore, dlrStatus, dlrStatContain);
}

function dealerCheckCard() {
    if(dlrScore.innerText <17) {
        hitCard(dlrScore, dealerDeck, dlrContainer, dlrStatus, dlrStatContain);
    } else {
        return;
    }
}



function plyrBlkJack(deck, container) {
    let variation1 = (deck[0].value === 10 && deck[1].value === 11);
    let variation2 = (deck[0].value === 11 && deck[1].value === 10);
    if (variation1 || variation2) { 
        removeBackCard();
        renderCardToContainers(playerDeck, plyrContainer);
        renderTotal();
        container.innerText = 'BLACKJACK!';
        plyrStatContain.style.visibility = 'visible';
    } 
    return;
}

function dlrBlkJack(deck, deck2, container) {
    let variation3 = (deck[0].value === 10 && deck2[0].value === 11);
    let variation4 = (deck[0].value === 11 && deck2[0].value === 10);
    if (variation3 || variation4) { 
        removeBackCard();
        renderCardToContainers(dealerDeck, dlrContainer);
        renderTotal();
        container.innerText = 'BLACKJACK!';
        dlrStatContain.style.visibility = 'visible';
    } 
    return;
}