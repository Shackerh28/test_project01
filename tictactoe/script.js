//put all elements in variables

let playerScore = document.querySelector('#play_score');
let compScore = document.querySelector('#comp_score');

//rock paper scissors

let rock = document.getElementById('rock');
let paper = document.getElementById('paper');
let scissors = document.getElementById('scissors');

//random pick




//clicked choices for player 

//player choice



//comp choice

function compChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * 3);
    return choices[random];
}

console.log(compChoice());

//set up conditions for winning and losing

//click events

function main() {
    let rockChoice = rock.addEventListener('click', function () {
        game('rock');
    })

    let paperChoice = paper.addEventListener('click', function () {
        game('paper');
    })

    let scissorsChoice = scissors.addEventListener('click', function () {
        game('scissors');
    })


}

main();


//game 

function game(userChoice) {
    const compGameChoice = compChoice();
    switch (userChoice + compChoice) {
        case 'paperrock':
        case 'rockscissors':
        case 'scissorspaper':
            console.log('user wins');
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            console.log('computer wins!');
            break;
                 
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            console.log('draw');
            break;
    }

}

console.log(game('rock'));