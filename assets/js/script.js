let playButton = document.getElementById("play-button");
let easyButton = document.getElementById("easy");
let mediumButton = document.getElementById("medium");
let hardButton = document.getElementById("hard");


let welcomeSection = document.getElementById("welcome-section");
let levelSection = document.getElementById("level-section");
let easyLevelSection = document.getElementById("egame-section");
let gameSection = document.getElementById("game-section");


// document.addEventListener('DOMContentLoaded', function() {
//     playButton.addEventListener('click', changePage("welcome"));
// })

// Function to change between sections
function changePage(id) {
    switch (id) {
        case "welcome":
            welcomeSection.classList.toggle("hidden");
            levelSection.classList.toggle("hidden");
            break;
        case "level":
            levelSection.classList.toggle("hidden");
            gameSection.classList.toggle("hidden");
            break;
        case "easy":
            levelSection.classList.toggle("hidden");
            easyLevelSection.classList.toggle("hidden");
            gameSection.classList.toggle("hidden");
            break;
        default:
            gameSection.classList.toggle("hidden");
            welcomeSection.classList.toggle("hidden");
    }
}

playButton.addEventListener("click", () => changePage("welcome"));
easyButton.addEventListener("click", () => changePage("easy"));
mediumButton.addEventListener("click", () => changePage("level"));
hardButton.addEventListener("click", () => changePage("level"));
