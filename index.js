const cardsContainer = document.getElementById("cards")
let deckId

getNewDeck()

function getNewDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
        })
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img class="card" src=${data.cards[0].image} />
            `
            cardsContainer.children[1].innerHTML = `
                <img class="card" src=${data.cards[1].image} />
            `
            getWinner(data.cards[0], data.cards[1])
        })
}

function getWinner (card1, card2) {
    const cardScores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1Score = cardScores.indexOf(card1.value)
    const card2Score = cardScores.indexOf(card2.value)
    
    if (card1Score > card2Score) {
        console.log("Card 1 wins!")
    }
    else if (card1Score < card2Score) {
        console.log("Card 2 wins!")
    }
    else {
        console.log("It's a tie!")
    }
}

document.getElementById("new-deck").addEventListener("click", getNewDeck)
document.getElementById("draw-cards").addEventListener("click", drawCards)