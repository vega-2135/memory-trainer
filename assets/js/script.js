// Buttons
/* jshint -W033 */
/* jshint esversion: 6 */
/*jshint sub:true*/

let playButton = document.getElementById("play-button");
let easyButton = document.getElementById("easy");
let mediumButton = document.getElementById("medium");
let hardButton = document.getElementById("hard");
let resetButton = document.getElementById("reset");
let playNewGameButton = document.getElementById("play-new-game-button");

let welcomeSection = document.getElementById("welcome-section");
let levelSection = document.getElementById("level-section");
let gameSection = document.getElementById("game-section");
let allCards = document.getElementById("all-cards")

const pageHeader = document.getElementById("page-header");


let difficulty;

// Image used as the cover
const coverImage = "assets/images/pink_square.png";

// Number of pairs depending on level
let easyLength = 3;
let mediumLength = 4;
let hardLength = 6;

// Counter of found pairs of images
let currentlyMatchingCards = 0;

// Answer will be an array containing img objects with the final index showed in the game
let answer;

//Array to be filled with ids pairs which will be used as indexes of images objects to check wether two pictures are the same
let flippedCards = [];


// Array with all the images (for easy. medium and hard levels)
let images = [
    {
        src: "assets/images/blueberries.webp",
        alt: "blueberries",
        class:"cards"
    },
    {
        src: "assets/images/lemon.webp",
        alt: "lemon",
        class:"cards"
    },
    {
        src: "assets/images/white_flower.webp",
        alt: "white flower",
        class:"cards"
    },
    {
        src: "assets/images/violet_flower.webp",
        alt: "violet flower",
        class:"cards"
    },
    {
        src: "assets/images/yellow_flower.webp",
        alt: "yellow flower",
        class:"cards"
    },
    {
        src: "assets/images/pineapple.webp",
        alt: "pineapple",
        class:"cards"
    }
]

/**
 * Change current page/section to another one depending
 * on what is clicked by the user
 */
function changePage(id, levelLength) {

    difficulty = levelLength;

    switch (id) {
        // Player has selected "Play Game" from the welcome screen
        case "welcome":
            welcomeSection.classList.toggle("hidden");
            levelSection.classList.toggle("hidden");
            break;
        // Player has selected the difficult level => Let the games begin!
        case "level":
            levelSection.classList.toggle("hidden");
            gameSection.classList.toggle("hidden");
            shuffleImagesPositions(images);
            showBlockedCards(levelLength);
            break;
        // Game ends and shows back the welcome
        case "newgame":
            gameSection.classList.toggle("hidden");
            welcomeSection.classList.toggle("hidden");
            break;

        // Player has clicked the H1 header so the welcome screen is shown again (and hide all other two sections)
        default:
            welcomeSection.classList.remove("hidden");
            levelSection.classList.add("hidden");
            gameSection.classList.add("hidden");
    }
}

/**
 * Shuffles the cards with the game pictures 
 * For this function the Fisher-Yates Sorting Algorithm
 * was used
 */
function shuffleImagesPositions(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Slice the Images array depending on the chosen level of 
 * difficulty, then shuffle this new array and cover the 
 * game pictures with a cover pink card
 */
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


/**
 * Shows a picture when its cover pink card is clicked
 * if the second uncovered picture doesn't match the first
 * uncovered picture, both pictures are covered again
 * with the pink cover card
 */
function showCard(id) {
    const img = document.getElementById("square" + id);

    if (!flippedCards.includes(id) && flippedCards.length < 2) {
        img.src = answer[id]['src'];
        flippedCards.push(id);

        // We need to check against 2, because we want to compre if two images match
        if (flippedCards.length === 2) {
            setTimeout(() => {
                matchingCards()
            }, 500); // Delay time before a third click of a cover image for better user experience
        }
    }
}

/**
 * Compares first and second uncovered pictures
 * when all matching pairs are found a congratulation 
 * message appears on the screen
 */
function matchingCards() {
    
    const [id1, id2] = flippedCards;
    const img1 = document.getElementById("square" + id1);
    const img2 = document.getElementById("square" + id2);

    if (answer[id1]['src'] === answer[id2]['src']) {
        currentlyMatchingCards += 2;

        // This removes the possiblity of being clickable and thus solves the bug of 
        // being counted more than once and flippable
        img1.removeAttribute("onclick");
        img2.removeAttribute("onclick");

        // When the user has matched all the pairs, then show congrats message and restart game with 0 flipped cards
        if (currentlyMatchingCards === answer.length) {
            // All pairs were found, player can end the game and play again
            currentlyMatchingCards = 0;
            Swal.fire({
                title: '🥳🥳 Congratulations 🎉🎉!!!',
                text: "You've matched all the cards! You're a memory genius 🤯!!!",
                icon: 'success',
                confirmButtonText: 'Play Again?'
            }).then((result) => {
                changePage("reset");
            });

        }
    } else {
        // Cards don't match, flip them back
        img1.src = coverImage;
        img2.src = coverImage;
    }
    flippedCards = []; // Reset flipped cards array

}

/** Re-shuffles the pictures covered by the pink cards
 * and the game starts again
 */
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
playNewGameButton.addEventListener("click", () => changePage("newgame"));
pageHeader.addEventListener("click", () => changePage("show-welcome-again"));
