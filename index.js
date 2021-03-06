let player = {
    name: "Anand",
    chips: 5000
}
count=0
let cards = []
let sum = 0
let bet=0
let hasBlackJack = false
let isAlive = false
let message = ""
let instruction=document.getElementById("instructions")
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let winningEl=document.getElementById("winnings")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let displayBet=document.getElementById("display-bet")
let zeroBalance = document.getElementById("zeroBal")
playerEl.textContent = player.name + ": $" + player.chips
displayBet.textContent="Currently placed Bets Amount = "+ bet
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}


function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    winningEl.textContent= ""
    
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips+= (count*1000)
        playerEl.textContent = player.name + ": $" + player.chips
        hasBlackJack=false
    } else {
        message = "You're out of the game!"
        isAlive = false
        count=0
        bet=0
        displayBet.textContent="Currently placed Bets = "+ bet
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function addBet(){
    if(player.chips>0){
        bet+=100
        displayBet.textContent="Currently placed Bets Amount = "+ bet
        player.chips-=100
        playerEl.textContent = player.name + ": $" + player.chips
        count++
    }
    if(player.chips<=0){
        zeroBalance.textContent="If your balance is zero, All profits and losses will be void."
    }
}

function stopGame(){
    if(player.chips>=5000){
        winningEl.textContent= "YOU WON " + (player.chips-5000)

    }
    else{
        winningEl.textContent= "YOU LOSE " + (5000-player.chips)
    }
    
}

instruction.textContent="Start the game. If the sum of the two cards is Less than 21, pick a new card. If the sum of the cards are more than 21, you are out. If the sum is 21, you win. You can add the amount you desire.If you win, you get 10 times the bets placed"

