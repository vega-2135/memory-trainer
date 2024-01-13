// Buttons
let playButton = document.getElementById("play-button");
let easyButton = document.getElementById("easy");
let mediumButton = document.getElementById("medium");
let hardButton = document.getElementById("hard");
let resetButton = document.getElementById("reset");

let welcomeSection = document.getElementById("welcome-section");
let levelSection = document.getElementById("level-section");
let easyLevelSection = document.getElementById("egame-section");
let gameSection = document.getElementById("game-section");
let allCards = document.getElementById("all-cards")

let difficulty;

// Image used as the cover
const coverImage = "assets/images/scaled_images/pink_square.png";

// Number of pairs depending on level
let easyLength = 3;
let mediumLength = 4;
let hardLength = 6;

// Counter of found pairs of images
let currentlyMatchingCards = 0;

// Answer will be an array containing img objects with the final index showed in the game
let answer;

//Array to be filled with ids pairs to which will be used as indexes of images objects to check wether two pictures are the same
let flippedCards = [];


// Array with all images (for easy. medium and hard levels)
let images = [
    {
        src: "assets/images/scaled_images/blueberries.png",
        alt: "blueberries",
        class:"cards"
    },
    {
        src: "assets/images/scaled_images/lemon.png",
        alt: "lemon",
        class:"cards"
    },
    {
        src: "assets/images/scaled_images/white_flower.jpg",
        alt: "white flower",
        class:"cards"
    },
    {
        src: "assets/images/scaled_images/violet_flower.jpg",
        alt: "violet flower",
        class:"cards"
    },
    {
        src: "assets/images/scaled_images/yellow_flower.jpg",
        alt: "yellow flower",
        class:"cards"
    },
    {
        src: "assets/images/scaled_images/pineapple.jpg",
        alt: "pineapple",
        class:"cards"
    }
]

// Function to change between sections
function changePage(id, levelLength) {

    difficulty = levelLength;
    console.log(difficulty);

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
    allCards.innerHTML = gameCoverCards;
}



function showCard(id) {
    const img = document.getElementById("square" + id);

    if (!flippedCards.includes(id) && flippedCards.length < 2) {
        img.src = answer[id]['src'];
        flippedCards.push(id);

        // todo: let's make it clearere why we need to check against 2
        if (flippedCards.length === 2) {
            setTimeout(() => {
                matchingCards()
            }, 500); // Delay time before a third click of a cover image for better user experience
        }
    }
}


function matchingCards() {
    
    const [id1, id2] = flippedCards;
    const img1 = document.getElementById("square" + id1);
    const img2 = document.getElementById("square" + id2);

    if (answer[id1]['src'] === answer[id2]['src']) {
        currentlyMatchingCards += 2;
        if (currentlyMatchingCards === answer.length) {
            // All pairs were found, player can end the game and play again
            currentlyMatchingCards = 0;
            alert("Congratulations! You've matched all the cards.");
            changePage("reset");
        }
    } else {
        // Cards don't match, flip them back
        img1.src = coverImage;
        img2.src = coverImage;
    }

    flippedCards = []; // Reset flipped cards array
}

function resetGame(difficulty) {

    images = shuffleImagesPositions(images);

    showBlockedCards(difficulty);

    currentlyMatchingCards = 0;


}

playButton.addEventListener("click", () => changePage("welcome"));
easyButton.addEventListener("click", () => changePage("level", easyLength))
mediumButton.addEventListener("click", () => changePage("level", mediumLength));
hardButton.addEventListener("click", () => changePage("level", hardLength));
resetButton.addEventListener("click", () => resetGame(difficulty));