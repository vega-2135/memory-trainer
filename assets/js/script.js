let playButton = document.getElementById("play-button");
let easyButton = document.getElementById("easy");
let mediumButton = document.getElementById("medium");
let hardButton = document.getElementById("hard");

let welcomeSection = document.getElementById("welcome-section");
let levelSection = document.getElementById("level-section");
let easyLevelSection = document.getElementById("egame-section");
let gameSection = document.getElementById("game-section");

// Image used as the cover
const coverImage = "assets/images/scaled_images/pink_square.png";

// Number of pairs depending on level
let easyLength = 3;
let mediumLength = 4;
let hardLength = 8;

let currentlyMatchingCards = 0;
let clickedImages = [];

// Answer will be an array containing img objects with the final index showed in the game
let answer;

// Array with all images (for easy. medium and hard levels)
const images = [
    {
        src: "assets/images/scaled_images/blueberries.png",
        alt: "blueberries"
    },
    {
        src: "assets/images/scaled_images/lemon.png",
        alt: "lemon"
    },
    {
        src: "assets/images/scaled_images/red_flower.jpg",
        alt: "blueberries"
    },
    {
        src: "assets/images/scaled_images/white_flower.jpg",
        alt: "white flower"
    },
    {
        src: "assets/images/scaled_images/strawberry.jpg",
        alt: "strawberry"
    },
    {
        src: "assets/images/scaled_images/violet_flower.jpg",
        alt: "violet flower"
    },
    {
        src: "assets/images/scaled_images/yellow_flower.jpg",
        alt: "yellow flower"
    },
    {
        src: "assets/images/scaled_images/pineapple.jpg",
        alt: "pineapple"
    }
]

// Function to change between sections
function changePage(id, levelLength) {

    switch (id) {
        case "welcome":
            welcomeSection.classList.toggle("hidden");
            levelSection.classList.toggle("hidden");
            break;
        case "level":
            levelSection.classList.toggle("hidden");
            gameSection.classList.toggle("hidden");
            shuffleImagesPositions(images);
            showBlockedCards(levelLength);
            break;

        // Game ends and shows back the welcome
        default:
            gameSection.classList.toggle("hidden");
            welcomeSection.classList.toggle("hidden");
    }
}


function shuffleImagesPositions(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function showBlockedCards(levelLength) {

    let levelImages = images.slice(0, levelLength);
    let totalImages = levelImages.concat(levelImages);
    answer = shuffleImagesPositions(totalImages);

    let gameCoverCards = "";
    for (let i = 0; i < levelLength * 2; i++) {
        gameCoverCards += `<img src=${coverImage} alt='pink_square' class='cards' id='square${i}' onclick="showCard(${i})"/>`;
    }
    gameSection.innerHTML = gameCoverCards;
}


function showCard(id) {

    const img = document.getElementById("square"+id);
    
    if (img.src.endsWith(coverImage)) {
        img.src = answer[id]['src'];
        console.log("showed the card");
    } else {
        img.src = coverImage;
        console.log("covered the card");
    }

}

playButton.addEventListener("click", () => changePage("welcome"));
easyButton.addEventListener("click", () => changePage("level", easyLength))
mediumButton.addEventListener("click", () => changePage("level", mediumLength));
hardButton.addEventListener("click", () => changePage("level", hardLength));
