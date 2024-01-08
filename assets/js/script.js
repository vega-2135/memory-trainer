document.addEventListener('DOMContentLoaded', function() {
    let playButton = document.getElementById("play-button");

    playButton.addEventListener('click', function() {
        if (this.getAttribute('data-type') === 'play') {
            selecLevel();
        }
    })
})


const images = [

    {
        src: "assets/images/",
    },
    {
        src:
    },
    {

    }


];



let difficultyLevel;

function selectLevel() {
    document.getElementById('difficulty').value = 
    


    const easyButton = document.getElementById("easy-button");
    const mediumButton = document.getElementById("medium-button");
    const hardButton = document.getElementById("hard-button");


    easyButton.addEventListener("click", setDifficulty(8));

    mediumButton.addEventListener("click", setDifficulty(10));

    easyButton.classList.toggle("")


}

function setDifficulty(value) {
    difficultyLevel = value;
    
}




