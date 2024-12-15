const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const cardsContainer = document.getElementById("cards")
let deckId

getNewDeck()

newDeckBtn.addEventListener("click", getNewDeck)
drawCardBtn.addEventListener("click", drawCards)

function getNewDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            console.log(deckId)
        })
}

function drawCards() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            cardsContainer.children[0].innerHTML = `
                <img class="card" src=${data.cards[0].image} />
            `
            cardsContainer.children[1].innerHTML = `
                <img class="card" src=${data.cards[1].image} />
            `
            header.textContent = getWinner(data.cards[0], data.cards[1])
        })
}

function getWinner (card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        return "Computer Wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return "You Win!"
    } else {
        return "War!"
    }
}