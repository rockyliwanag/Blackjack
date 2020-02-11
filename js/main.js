/*----- constants -----*/
const ambience = new Audio('');
const shuffleDeck = new Audio('');
const giveCard = new Audio('');
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

/*----- app's state (variables) -----*/

let dealerTotal;
let playerTotal;
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
let face = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K'];
let suit = ['Spades', 'Club', 'Heart', 'Diamond'];

class Card {
    constructor(value1, value2, img ){
        this.value1 = value1;
        this.value2 = value2;
        this.img = img;
    }
}
let As = new Card('A', 1, 11, 'Spade', 'Images/Spades/spades-Audio.svg');

function dealCards(){ //shuffle cards and deal 2 to dealer 2 to player
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