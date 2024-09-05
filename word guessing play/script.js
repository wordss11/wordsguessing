const words = {
    "apple": "images/apple.jpg",
    "banana": "images/banana.jpg",
    "cherry": "images/cherry.jpg",
    "grape": "images/grape.jpg",
    "lemon": "images/lemon.jpg",
    "mango": "images/mango.jpg",
    "orange": "images/orange.jpg",
    "peach": "images/peach.jpg",
    "pear": "images/pear.jpg",
    "watermelon": "images/watermelon.jpg"
};

let currentWord = '';
let currentImagePath = '';
let timer;
let timeLeft = 30;  // Time in seconds
let wordList = Object.keys(words);
let score = 0;  // Initialize score

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('guess-button').addEventListener('click', checkGuess);
    document.getElementById('next-button').addEventListener('click', nextWord);
    document.getElementById('pass-button').addEventListener('click', passWord);
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('stop-button').addEventListener('click', stopGame);
    document.getElementById('previous-button').addEventListener('click', previousWord);
});

function startGame() {
    timeLeft = 30;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}`;
    shuffleWords();  // Shuffle the word list
    nextWord();  // Load the first word
    timer = setInterval(updateTimer, 1000);
    document.getElementById('result-icon').textContent = '';  // Clear result icon
    document.getElementById('result-message').textContent = ''; // Clear result message
    document.getElementById('correct-word').textContent = ''; // Clear correct word display
    score = 0; // Reset score
}

function stopGame() {
    clearInterval(timer);
    document.getElementById('timer').textContent = `Time left: 0`;
    document.getElementById('result-message').textContent = `Game Stopped! Final Score: ${score}`;
    document.getElementById('result-icon').textContent = '';  // Clear result icon
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('result-message').textContent = 'Time is up!';
        document.getElementById('result-message').style.fontSize = '30px'; // Ensure the font size is 30px
        document.getElementById('result-icon').textContent = '❌'; // Show incorrect mark
        document.getElementById('correct-word').textContent = `The correct word was: ${currentWord}`; // Show the correct word
        return;
    }
    timeLeft -= 1;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}`;
}

function shuffleWords() {
    for (let i = wordList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordList[i], wordList[j]] = [wordList[j], wordList[i]];
    }
}

function nextWord() {
    if (wordList.length > 0) {
        currentWord = wordList.shift(); // Get the first word from the shuffled list
        currentImagePath = words[currentWord];
        document.getElementById('word-image').src = currentImagePath;
        document.getElementById('scrambled-word').textContent = scrambleWord(currentWord); // Show the scrambled word
        document.getElementById('result-message').textContent = '';
        document.getElementById('guess-input').value = '';
        document.getElementById('result-icon').textContent = '';  // Clear result icon
        document.getElementById('correct-word').textContent = ''; // Clear correct word display
        timeLeft = 30; // Reset timer for the new word
        document.getElementById('timer').textContent = `Time left: ${timeLeft}`; // Update timer display
    } else {
        document.getElementById('result-message').textContent = `No more words! Final Score: ${score}`;
        clearInterval(timer); // Stop timer
    }
}

function previousWord() {
    // Implement based on your needs
}

function scrambleWord(word) {
    // Scramble the word by converting it to an array, shuffling it, and joining it back
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function checkGuess() {
    const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    if (userGuess === currentWord) {
        document.getElementById('result-message').textContent = 'Correct!';
        document.getElementById('result-message').style.fontSize = '30px'; // Ensure the font size is 30px
        document.getElementById('result-icon').textContent = '✔️'; // Show correct mark
        score += 10; // Add points for correct answer
        // Move to the next word after showing the result
        setTimeout(nextWord, 2000); // Delay the transition to the next word
    } else {
        document.getElementById('result-message').textContent = 'Incorrect!';
        document.getElementById('result-message').style.fontSize = '30px'; // Ensure the font size is 30px
        document.getElementById('result-icon').textContent = '❌'; // Show incorrect mark
        document.getElementById('correct-word').textContent = `The correct word was: ${currentWord}`; // Show the correct word
        // Move to the next word after showing the result
        setTimeout(nextWord, 2000); // Delay the transition to the next word
    }
}

function passWord() {
    nextWord();
}
