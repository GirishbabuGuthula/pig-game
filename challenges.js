/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores,roundScore,activePlayer,gamePlaying;

init();

var lastDice;

//  dice;

// var x = document.querySelector("#score-0").textContent;
// console.log(x);

document.querySelector('.dice').style.display = 'none';

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";

document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function (){
    if(gamePlaying){
            //1.random number
            var dice1= Math.floor(Math.random() *6 + 1);
            var dice2= Math.floor(Math.random() *6 + 1);

            //2.display the result
            document.getElementById("dice-1").style.display = "block";
            document.getElementById("dice-2").style.display = "block";
            document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
            document.getElementById("dice-2").src = "dice-" + dice2 + ".png";


            //3.update the round score if the rolled number was not 1
            if(dice1 !== 1 && dice2 !== 1){
                roundScore += dice1 + dice2;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }else{
                //nextplayer
                 nextPlayer();
            }
            // if(dice === 6 && lastDice === 6){
            //     //player loses score
            //     scores[activePlayer] = 0;
            //     document.querySelector("#score-" + activePlayer).textContent = "0";
            //     nextPlayer();
            // }else if(dice !== 1){
            //     roundScore += dice;
            //     document.querySelector("#current-" + activePlayer).textContent = roundScore;
            // }else{
            //     //nextplayer
            //      nextPlayer();
            // }
            // lastDice = dice;
    }

});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        //1.add currentscore to global score
        scores[activePlayer] += roundScore;

        //2.update the UI
         document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
         var winningScore;

         var input = document.querySelector(".final-score").value;
         if(input){
             winningScore = input;
         }else{
             winningScore = 100;
         }

         //3.check if player won the game
        if(scores[activePlayer] >= winningScore){
            document.querySelector("#name-" + activePlayer).textContent = "winner!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    // document.querySelector(".player-0-panel").classList.remove("active");
    // document.querySelector(".player-1-panel").classList.add("active");
    
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    scores= [0,0];
    roundScore= 0;
    activePlayer= 0;

    gamePlaying = true;

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
    
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "player 1";
    document.getElementById("name-1").textContent = "player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
}