document.addEventListener('DOMContentLoaded', function () {
  // Array of random words
  const lexicon = [
    // Names
    "goran",
    "fia",
    "sven",
    "noa",
    // Animals
    "cat",
    "dog",
    "bunny",
    // Fruits
    "banana",
    "apple",
    "orange",
    "grape",
  ];

  // Function to generate a random word
  function selectRandomWord(lexicon) {
    return lexicon[Math.floor(Math.random() * lexicon.length)];
  }

  const chosenWord = selectRandomWord(lexicon);
  const chosenWordSplit = chosenWord.split('');

  // Array to store incorrectly guessed letters
  let incorrectGuesses = [];
  // Array to store all guessed letters
  let guessedLetters = [];
  const userInput = document.querySelector(`#letter1`);
  const incorrectGuessDisplay = document.querySelector(`#letterLog`);
  const hiddenWord = Array(chosenWordSplit.length).fill(`?`);
  const wordParagraph = document.querySelector(`#outputLines`);

  // Display underscores in the paragraph element.
  wordParagraph.innerHTML = `${hiddenWord}`;

  // Function to check if the game is over.
  function isGameOver() {
    if (incorrectGuesses.length > 5) {
      setTimeout(() => {
        alert(
          `Sorry, Game Over! The word you are looking for is: ${chosenWord}` +
          " Press: -OK- if you want to play again"
        );
        location.reload();
      }, 200);
    }
  }

  // Function to check if the user has won the game.
  function hasPlayerWon() {
    if (hiddenWord.join("") === chosenWordSplit.join("")) {
      setTimeout(() => {
        alert("Congratulations! You Won! Press: -OK- if you want to play again");
        location.reload();
      }, 200);
    }
  }

  // Add an event listener to the 'userInput' element that triggers when the user provides input.
  userInput.addEventListener(`input`, (checkInput) => {
    let letter = checkInput.target.value.toLowerCase();

    if (!guessedLetters.includes(letter)) {
      guessedLetters.push(letter);

      if (chosenWordSplit.includes(letter)) {
        for (let i = 0; i < chosenWordSplit.length; i++) {
          if (letter === chosenWordSplit[i]) {
            hiddenWord[i] = letter;
            wordParagraph.innerHTML = hiddenWord.join(" ");
            hasPlayerWon();
          }
        }
      } else {
        incorrectGuessDisplay.innerHTML += letter;
        index = index + 1;
        svgParts[index].style.display = "block";
        incorrectGuesses.push(letter);
        isGameOver();
      }

    } else if (guessedLetters.includes(letter)) {
      alert(letter + " <- already guessed");
    }

    userInput.value = "";
  });

  const svgGround = document.getElementById("ground");
  const svgHead = document.getElementById("head");
  const svgBody = document.getElementById("body");
  const svgArms = document.getElementById("arms");
  const svgLegs = document.getElementById("legs");
  const svgScaffold = document.getElementById("scaffold");

  const svgParts = [svgGround, svgHead, svgScaffold, svgLegs, svgArms, svgBody];
  let index = -1;

  svgParts.forEach((part, i) => {
    if (i !== index) {
      part.style.display = "none";
    }
  });

  // Get the button element from HTML
  const showButton = document.getElementById('revealButton');

  // Add a click event listener to the button
  showButton.addEventListener('click', function () {
    // Display the entire word when the button is clicked
    wordParagraph.innerHTML = chosenWord;
  });

  console.log(chosenWord);
});
