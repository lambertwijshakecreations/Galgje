let answer = ""; //letter die gekozen wordt
let maxWrong = 6; //aantal fouten die je mag maken
let mistakes = 0; //aantal fouten die zijn gemaakt
let guesed = []; //letters die gekozen zijn
let wordStatus = null; //status van het gekozen woord

//aantal foutmeldingen op het scherm weergeven
document.getElementById("maxWrong").innerHTML = maxWrong;

//functie die een willekeurig woord kiest uit de array
const randomWord = function () {
	let item = arrayLijst[Math.floor(Math.random() * arrayLijst.length)];
	let arayItem = item.array[Math.floor(Math.random() * item.array.length)];
	answer = arayItem;
	document.getElementById("titel").innerText = item.titel;
};

//een functie die een toetsenbord maakt met de letters war je uit kan kiezen
const generateButtons = function () {
	let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
		.split("")
		.map(
			(letter) =>
				`
        <button
        class="btnLetter"
        id=${letter}
        onClick="handleGues('${letter}')"
        >
        ${letter}
        </button>
        `
		)
		.join("");

	document.getElementById("keyboard").innerHTML = buttonsHTML;
};

const handleGues = function (chosenLetter) {
	let pickChosenLetter = document.getElementById(chosenLetter);
	guesed.indexOf(chosenLetter) === -1 ? guesed.push(chosenLetter) : null;
	pickChosenLetter.setAttribute("disabled", true);
	pickChosenLetter.className = "choseThis";
	if (answer.indexOf(chosenLetter) >= 0) {
		guesseWord();
		checkIfGameWon();
	} else if (answer.indexOf(chosenLetter) === -1) {
		mistakes++;
		updateMistakes();
		checkIfGameLost();
		updateHangmanPicture();
	}
};

const updateHangmanPicture = function () {
	document.getElementById("hangmanPic").src = `./images/${mistakes}.png`;
};

const checkIfGameWon = function () {
	if (wordStatus === answer) {
		document.getElementById("result").innerHTML = "Je hebt Gewonnen!!!";
	}
};

const checkIfGameLost = function () {
	if (mistakes === maxWrong) {
		document.getElementById(
			"object"
		).innerHTML = `Het goede antwoord was ${answer}`;
		document.getElementById("result").innerHTML = "Je hebt Verloren!!!";
	}
};

const guesseWord = function () {
	wordStatus = answer
		.split("")
		.map((letter) => (guesed.indexOf(letter) >= 0 ? letter : " _ "))
		.join("");

	document.getElementById("object").innerHTML = wordStatus;
};

const updateMistakes = function () {
	document.getElementById("mistakes").innerHTML = mistakes;
};

const reset = function () {
	mistakes = 0;
	guesed = [];
	document.getElementById("hangmanPic").src = "./images/0.png";
	randomWord();
	guesseWord();
	updateMistakes();
	generateButtons();
	document.getElementById("result").innerHTML = "";
};

//functies die opgeroepen worden
randomWord();
generateButtons();
guesseWord();
