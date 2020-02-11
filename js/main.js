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
    dealCards: function() {

    }
};

let faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let suits = ['Spades', 'Club', 'Heart', 'Diamond'];
let masterDeck = getDeck();


/*----- app's state (variables) -----*/

let dealerTotal;
let playerTotal;
let shuffledDeck;
let dealerDeck;
let playerDeck;
//player Total //reduce() to get total value
//Dealer Total//reduce() to get total value
//player turn

/*----- cached element references -----*/
const deal = document.getElementById('reset-button');
const hit = document.getElementById('hit-button');
const stay = document.getElementById('stay-button');
const dlrScore = document.getElementById('dealer-score');
const plyrScore = document.getElementById('player-score');



/*----- event listeners -----*/

deal.addEventListener('click', dealCards);
hit.addEventListener('click', nextCard);
stay.addEventListener('click', holdCards);


/*----- functions -----*/

//deck of cards


// class Card {
//     constructor(value1, value2, img ){
//         this.value1 = value1;
//         this.value2 = value2;
//         this.img = img;
//     }
// }
// let As = new Card('A', 1, 11, 'Spade', 'Images/Spades/spades-Audio.svg');


function getDeck(){
    let deck = [];
    suits.forEach(function(suit) {
        faces.forEach(function(face){
            deck.push({
                face: `${suit}${face}`,
                value: Number(face) || (face === 'A' ? 11 : 10)
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

// function renderCardToContainer(deck, container) {
//     container.innerHTML = '';
//     let cardsHtml = deck.
// }



// function checkImage(faceImg, suitImg) {
//     return ``;
// }

function dealCards(){ //shuffle cards and deal 2 to dealer 2 to player
    shuffleDeck();
    
    console.log (masterDeck);
    console.log('deal cards!');

}

function nextCard(){ //push card to player hand array
    console.log('hit me!');
}

function holdCards() {
    console.log('tap, tap');
}





//-Game initializes, cards need to be shuffled randomnly
//-Cards get dealt 2 cards to dealer/player/dealer/player
//-Get sum of player cards on hand
//-Get sum of dealer cards on hand

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