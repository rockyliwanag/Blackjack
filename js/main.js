/*----- constants -----*/
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

//player Total //reduce() to get total value
//Dealer Total//reduce() to get total value
//player turn

/*----- cached element references -----*/
const deal = document.getElementById('reset-button');
const hit = document.getElementById('hit-button');
const stay = document.getElementById('stay-button');
const dlrScore = document.getElementById('dealer-score');
const plyrScore = document.getElementById('player-score');

//deck of cards
class Card {
    constructor(){
        this.deck = [];
        const value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
        const suits = [Heart, Diamond, Spade, Club];

    }
}

//player/computer sum

/*----- event listeners -----*/

deal.addEventListener('click', dealCards);
hit.addEventListener('click', nextCard);
stay.addEventListener('click', holdCards);

//Hit Button
//Stay Button
//Deal Button

/*----- functions -----*/

function dealCards(){
    console.log('deal cards!');

};

function nextCard(){
    console.log('hit me!');
};

function holdCards() {
    console.log('tap, tap');
};



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















