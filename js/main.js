/*----- constants -----*/

const ambience = new Audio('');
const shuffSound = new Audio('');
const dealSound = new Audio('');

const PLAYERS = {
    '0' : {
        name: 'Dealer',
        cards: []
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

let dealerTotal;
let playerTotal;
let shuffledDeck;
let dealerDeck = PLAYERS[0].cards;
let playerDeck = PLAYERS[1].cards;

/*----- cached element references -----*/

const deal = document.getElementById('reset-button');
const hit = document.getElementById('hit-button');
const stay = document.getElementById('stay-button');
const dlrScore = document.getElementById('dealer-score');
const plyrScore = document.getElementById('player-score');
const dlrContainer = document.getElementById('dealer-cards');
const plyrContainer = document.getElementById('player-cards');

/*----- event listeners -----*/

deal.addEventListener('click', dealCards);
hit.addEventListener('click', nextCard);
stay.addEventListener('click', holdCards);

/*----- functions -----*/

function getDeck(){
    let deck = [];
    suits.forEach(function(suit) {
        faces.forEach(function(face){
            deck.push({
                face: `${suit}${face}`,
                value: parseInt(face) || (face === 'A' ? 11 : 10)
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

function dealCards(){ //shuffle cards and deal 2 to dealer 2 to player
    shuffleDeck();
    let deal = function() {
        if( PLAYERS[0].cards.length === 0){
            playerDeck.push(shuffledDeck.pop());
            dealerDeck.push(shuffledDeck.pop());
            playerDeck.push(shuffledDeck.pop());
            // dealerDeck.push(renderBackCard()); //facedown card .card.back-red
            // console.log(renderBackCard());
        }
    };
    deal();
    dNum();
    pNum();
    renderTotal();
    renderBackCard();
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
let temp
function renderBackCard() {
    let backCard = document.createElement('div');
    backCard.setAttribute('class', 'card back-red');
    dealerDeck.push(backCard);
    return temp;
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

function renderTotal() {
    dlrScore.innerText = dNum();
    plyrScore.innerText = pNum();
}

//need function that takes dNum and pNum as arguments and see if it is a total of 21 - player with 21 wins.
// function checkWinner (dNum, pNum) {
//     if( PLAYERS[0].cards.);
// }

function nextCard() { //push card to player hand array
    
    console.log('hit me!');
}

function holdCards() {
    console.log('tap, tap');
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
    //-if player sum of cards is greater than 21 and dealer is 
    //  less than 21, dealer wins
    //-if player and dealer is less than 21 and hold cards, 
    //  whoever is closest to 21 wins