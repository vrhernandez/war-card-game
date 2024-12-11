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
            cardTable.innerHTML = ""
            for(let card of data.cards) {
                console.log(`${card.value} of ${card.suit}`)
                cardTable.innerHTML += `<img src="${card.image}">`
            }
        })
}

document.getElementById("new-deck").addEventListener("click", getNewDeck)
document.getElementById("draw-cards").addEventListener("click", drawCards)