// TODO: Fix click functionality if click more than 2 spots before 1 second passes


/*
 * Create a list that holds all of your cards
 */

// list of all cards
const cards = Array.from(document.querySelectorAll('.card'));

// current deck of cards
const deck = document.querySelector('.deck');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Create new deck
function shuffleDeck() {

    // Removes all cards from current deck
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }

    // Shuffles 'master deck' and creates a new deck
    const activeDeck = shuffle(cards)

    let docFrag = document.createDocumentFragment();

    // Creates new deck from shuffled cards
    for (let i = 0; i < activeDeck.length; i++) {
        const newElement = activeDeck[i];
        newElement.classList.remove('open', 'show', 'match'); // resets classes
        docFrag.appendChild(newElement);
    }

    // Adds new deck to page
    deck.appendChild(docFrag);

    // Resets open cards being tracked
    openCardsArr = [];

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function toggleOpen(activeCard) {
    activeCard.classList.toggle('open');
    activeCard.classList.toggle('show');
}

function toggleMatch(activeCard) {
    toggleOpen(activeCard);
    activeCard.classList.add('match');
}

function showCard(activeCard) {
    toggleOpen(activeCard);
}

let openCardsArr = [];

// Running track of open cards
function trackOpenCards(activeCard) {
    openCardsArr.push(activeCard);
}

function checkMatch() {

    //console.log(openCardsArr[0].firstElementChild);
    //console.log(openCardsArr[1].firstElementChild);

    if (openCardsArr[0].firstElementChild.className == openCardsArr[1].firstElementChild.className) {

        //if match, add match class, remove open and show
        console.log('it\'s a match!');

        openCardsArr.forEach(function(el) {
            setTimeout(function() {
                el.classList.add('match');
                toggleOpen(el);
                openCardsArr = [];
            }, 1000);

        });

    } else {

        //if not match, remove open and show classes, reset openCardsArr to 0
        console.log('it\'s not a match!');

        openCardsArr.forEach(function(el) {
            setTimeout(function() {
                toggleOpen(el);
                openCardsArr = [];
            }, 1000);
        });
    }

}


function clickCard(evt) {
    const activeCard = evt.target;

    if (activeCard.nodeName === 'LI' && !activeCard.classList.contains('match')) {
        showCard(activeCard);
        trackOpenCards(activeCard);

        if (openCardsArr.length === 2) {
            checkMatch();
        }

    }

}


deck.addEventListener('click', clickCard);

const restart = document.querySelector('.restart');

restart.addEventListener('click', shuffleDeck);

// In case .js files are moved to 'head'
document.addEventListener('DOMContentLoaded', function(evt) {
    shuffleDeck(); // Creates new deck
});