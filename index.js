const cardTable = document.getElementById("card-table")
let deckId

getNewDeck()

function getNewDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardTable.innerHTML = `
                <img class="card" src=${data.cards[0].image} />
                <img class="card" src=${data.cards[1].image} />
            `
        })
}

document.getElementById("new-deck").addEventListener("click", getNewDeck)
document.getElementById("draw-cards").addEventListener("click", drawCards)