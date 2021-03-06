/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer,gamePlaying;

/*scores = [0,0];
roundScore = 0;
activePlayer = 0;*/

init();
/*
going in inti function below
dice = Math.floor(Math.random()*6) +1;


//document.querySelector('#current-' + //activePlayer).textContent = dice;

//known as a setter since it sets the value in the web page
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//know as a getter since it retrieves the info on the web page
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

*/

var clicked = document.querySelector('.btn-roll').addEventListener('click',function(){
    //1st we need a random number after the click
    //changing state from true to false to stop game from playing
    if(gamePlaying){
        
        var dice = Math.floor(Math.random()*6) +1;
    
    //2nd display the result
   var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    //change photo but useing src
    diceDOM.src =  'dice-'+ dice + '.png';  
    
    //update round score IF the rolled number was not a 1
    
    if(dice !== 1) {
        //different from 1 !==
        //add score 
        // +== is same as saying roundScore = roundScore + dice simple way
        roundScore += dice;
        //now display roundscore
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

           }else{
        //next player
        nextPlayer();
        }
        
    };
    
    
 
        
    
});


document.querySelector('.btn-hold').addEventListener('click',function(){
    
    if(gamePlaying){
        
    //add current score to global score //update UI(userinterface)
    
    scores[activePlayer] += roundScore
    
    
    //update
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        
        
    }else {
        nextPlayer()
    }
    //check if player won the game
    }
});

function nextPlayer(){
     //next player
        activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        //change the active player by removing and adding class
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        //now toogle insted of upper
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        // teneray operator// if(?) active player is equal to 0 then active player is equal to 1
        //else : active player is equal to 0
        /*same thing as 
        if(activePlayer === 0){
        activePlayer = 1;
        else {
        activePlayer = 0;}*/
        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);{
    scores[0,0];
    activePlayer = 0;
    roundScore = 0;
    
}

function init(){
    scores = [0,0];
roundScore = 0;
activePlayer = 0;
    
    dice = Math.floor(Math.random()*6) +1;


//document.querySelector('#current-' + //activePlayer).textContent = dice;

//known as a setter since it sets the value in the web page
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//know as a getter since it retrieves the info on the web page
//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
    
            document.querySelector('.player-0-panel').classList.remove('winner');
            document.querySelector('.player-1-panel').classList.remove('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-0-panel').classList.add('active');
           



}
