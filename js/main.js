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
// let aceCard = 
let dealerDeck = PLAYERS[0].cards;
let playerDeck = PLAYERS[1].cards;
let dealerHiddenDeck = PLAYERS[0].hiddenCard;

/*----- cached element references -----*/

const deal = document.getElementById('reset-button');
const hit = document.getElementById('hit-button');
const stay = document.getElementById('stay-button');
const dlrScore = document.getElementById('dealer-score');
const plyrScore = document.getElementById('player-score');
const dlrContainer = document.getElementById('dealer-cards');
const plyrContainer = document.getElementById('player-cards');
const dlrStatus = document.getElementById('dealer-status');
const plyrStatus = document.getElementById('player-status');
const dlrStatContain = document.getElementById('dStatContainer');
const plyrStatContain = document.getElementById('pStatContainer');

/*----- event listeners -----*/

deal.addEventListener('click', dealCards);
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

function dealCards(){
    init();
    if (dealerDeck.length < 2) {
        shuffleDeck();
        giveCards();
        renderTotal();
        renderBackCard();
        renderCardToContainers(dealerDeck, dlrContainer);
        renderCardToContainers(playerDeck, plyrContainer);
        checkBlackjack();
        // modTotal();

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
    
function dNum() {
    let dTotal = dealerDeck.reduce((acc, cur) => {
        acc += cur.value;
        return acc;
    }, 0);
    return dTotal;
}

function pNum() {
    let pTotal = playerDeck.reduce((acc, cur) => {
        acc += cur.value;
        return acc;
    }, 0);
    return pTotal;
}

function dNumMod() {
    let dModTotal = dealerDeck.reduce((acc, cur) => {
        acc += cur.mod;
        return acc;
    }, 0);
    return dModTotal;
}

function pNumMod() {
    let pModTotal = dealerDeck.reduce((acc, cur) => {
        acc += cur.mod;
        return acc;
    }, 0);
    return pModTotal;
}

function renderTotal() {
    dlrScore.innerText = dNum();
    plyrScore.innerText = pNum();
}

function nextCard() {
    hitCard(plyrScore, playerDeck, plyrContainer);
    checkBlackjack();
}

function hitCard(score, deck, container) {
    if (score.innerText < 21) {
        deck.push(shuffledDeck.pop());
        renderCardToContainers(deck, container);
        renderTotal();
        return
    } else if (score.innerText > 21){ 
        renderTotal();
        plyrStatus.innerText = 'BUST!';
        plyrStatContain.style.visibility = 'visible';
        renderCardToContainers(playerDeck, plyrContainer);
        return;
    }
}
 
// need a function to modify Ace card
    //need to give 2 totals one with value of 11+ and one with 1+ and concat 11+total with 1+total 11/1

// let aceCard = 
    

    //function that initializes dealer logic.


function holdCards() {
    if (dealerDeck.length <= 2 ) {
        removeBackCard();
        renderTotal();
        // return;
    }
    // dlrLogic();
    renderCardToContainers(dealerDeck, dlrContainer);
}

function dlrLogic() {
    if ( dealerTotal < 17 ){

    }
}

function checkBlackjack(){
    dblackJack(dealerDeck, dealerHiddenDeck, dlrStatus);
    pblackJack(playerDeck, plyrStatus);
    twentyOne(playerDeck, plyrScore, plyrStatus, plyrStatContain);
    twentyOne(dealerDeck, dlrScore, dlrStatus, dlrStatContain);
}

// let gameOverBtns = function() {
//     if()
// };


// results functions
function pblackJack(deck, container) {
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
function dblackJack(deck, deck2, container) {
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

function twentyOne(deck, score, container1, container2){
    if ( deck.length > 2 && score.innerText === '21') {
            container1.innerText = 'TWENTY ONE!';
            container2.style.visibility = 'visible';
    }
}

function push(){

}



//Dealer move logic
    //-if sum of cards are less than 17 dealer hits
    //-if sum of cards are greater than or equal to 17 dealer 
    //  stays
    //-if sum of cards are greater than 21 dealer busts

//Win logic
    //-if player sum of cards is greater than 21 player busts, 
    //  dealer wins
    //-if dealer sum of cards is greater than 21 and player is 
    //  less than 21, player wins
    //- DONE - if player sum of cards is greater than 21 and dealer is -
    //  - less than 21, dealer wins - DONE
    //-if player and dealer is less than 21 and hold cards, 
    //  whoever is closest to 21 wins

