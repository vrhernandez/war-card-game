const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const remainingCardCount = document.getElementById("remaining-card-count")
const header = document.getElementById("header")
const cardsContainer = document.getElementById("cards")
const compScoreEl = document.getElementById("comp-score")
const yourScoreEl = document.getElementById("your-score")
let computerScore = 0
let yourScore = 0
let deckId

newDeckBtn.addEventListener("click", getNewDeck)
drawCardBtn.addEventListener("click", drawCards)

async function getNewDeck() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    const data = await res.json()
    deckId = data.deck_id
    remainingCardCount.textContent = `Cards Remaining: ${data.remaining}`
    console.log(deckId)
    drawCardBtn.disabled = false
}

async function drawCards() {
    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    cardsContainer.children[0].innerHTML = `
        <img class="card" src=${data.cards[0].image} />
    `
    cardsContainer.children[1].innerHTML = `
        <img class="card" src=${data.cards[1].image} />
    `
    remainingCardCount.textContent = `Cards Remaining: ${data.remaining}`
    header.textContent = getMatchWinner(data.cards[0], data.cards[1])

    if (data.remaining === 0) {
        drawCardBtn.disabled = true
        header.textContent = getGameWinner()
    }
}

function getMatchWinner (card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        compScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer Scores!"
    } else if (card1ValueIndex < card2ValueIndex) {
        yourScore++
        yourScoreEl.textContent = `Your score: ${yourScore}`
        return "You Score!"
    } else {
        return "War!"
    }
}

function getGameWinner() {
    if (computerScore > yourScore) {
        return "Computer wins the game!!!"
    } else if (computerScore < yourScore) {
        return "You win the game!!!"
    } else {
        return "It's a tie!!!"
    }
}