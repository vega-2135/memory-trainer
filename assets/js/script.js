let playButton = document.getElementById("play-button");
let easyButton = document.getElementById("easy");
let mediumButton = document.getElementById("medium");
let hardButton = document.getElementById("hard");


let welcomeSection = document.getElementById("welcome-section");
let levelSection = document.getElementById("level-section");
let easyLevelSection = document.getElementById("egame-section");
let gameSection = document.getElementById("game-section");


// Array with easy game images
let easyGame = document.getElementById("easy-game");
let easyImages = [
    {
        src: "assets/images/scaled_images/blueberries.png", alt: "blueberries", class: "cards"
    },
    {
        src: "assets/images/scaled_images/lemon.png", alt: "lemon", class: "cards"
    },
    {
        src: "assets/images/scaled_images/red_flower.jpg", alt: "red flower", class: "cards"
    },
    {
        src: "assets/images/scaled_images/white_flower.jpg", alt: "white flower", class: "cards"
    }
]


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

// Shuffle images 
imageRandomizer(easyImages);
addEasyImages();


mediumButton.addEventListener("click", () => changePage("level"));
hardButton.addEventListener("click", () => changePage("level"));


function addEasyImages() {
    let easyGameContent = "";
    easyImages.forEach(image => {
    easyGameContent += `<img src="${image.src}" alt="${image.alt}" class="${image.class}">\n`;
    }); // New line id added because otherwise the css wont be applied completely to the images
    easyGame.innerHTML = easyGameContent;
}


function imageRandomizer(a) {
  for (let i = a.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [a[i], a[j]] = [a[j], a[i]]; 
    } 
  return a;
  }

