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

const BUTTONS = {
    'Deal' : {
        name: 'Deal',
        image: './Images/deal-button.png'
    },
    'Hit' : {
        name: 'Hit',
        image: './Images/hit-button.png'
    },
    'Stay' : {
        name: 'Stay',
        image: './Images/stay-button.png'
    }
};

/*----- app's state (variables) -----*/

//player Total
//Dealer Total
//Shuffle Cards
//player turn

/*----- cached element references -----*/

//deck of cards
class Card {
    constructor(name, value, suit, image){
        this.name = name;
        this.value = value;
        this.suit = suit;
        this.image = image;
    }
}

//player/computer sum

/*----- event listeners -----*/

//Hit Button
//Stay Button
//Deal Button

/*----- functions -----*/

//-Game initializes, cards need to be shuffled randomnly
//-Cards get dealt 2 cards to dealer/player/dealer/player
//-Get sum of player cards on hand
//-Get sum of dealer cards on hand

//Dealer move logic
    //-if sum of cards are less than 17 dealer hits
    //-if sum of cards are greater than or equal to 17 dealer 
    //  stays
    //-if sum of cards is a soft 17 dealer hits //throw an or
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















