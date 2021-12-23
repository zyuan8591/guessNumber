const guessBtn = document.querySelector('#guessBtn');
const answerA = document.querySelector('#guessA');
const answerB = document.querySelector('#guessB');
const guessNumber = document.querySelector('#selectNumber');
const guess = document.querySelector('#guess');
const answerHistory = document.querySelector('#history');
const reset = document.querySelector('#reset');
let theAnswer = makeAnswer(guessNumber.value);
//default
let guestGuess = [];
let guessA = 0;
let guessB = 0;

let isWin = false;
guessNumber.addEventListener('change', resetF);
reset.addEventListener('click', function (e) {
	e.preventDefault();
	resetF();
});
guessBtn.addEventListener('click', function (e) {
	e.preventDefault();
	//set guess answer
	for (let num of guess.value) {
		guestGuess.push(parseInt(num));
	}

	if (isWin === false) {
		if (guestGuess.length !== parseInt(guessNumber.value)) {
			alert(`Wrong Number, PLEASE ENTER ${guessNumber.value} numbers !!`);
		} else if (testNaN(guestGuess)) {
			alert('PLEASE ENTER NUMBER');
		} else {
			guessA = 0;
			guessB = 0;
			for (let i = 0; i < theAnswer.length; i++) {
				for (let j = 0; j < theAnswer.length; j++) {
					if (guestGuess[i] === theAnswer[j] && i === j) {
						guessA += 1;
					} else if (guestGuess[i] === theAnswer[j] && i !== j) {
						guessB += 1;
					}
				}
			}
			answerA.innerHTML = guessA;
			answerB.innerHTML = guessB;
			let ansHis = document.createElement('li');
			ansHis.classList.add(
				'list-group-item',
				'border',
				'border-warning',
				'mb-2'
			);
			ansHis.innerHTML = `${guess.value}：${guessA}A${guessB}B`;
			answerHistory.append(ansHis);
			guess.value = '';
			if (guessA === theAnswer.length) {
				isWin = true;
				guessBtn.disabled = true;
			}
		}
	} else if ((isWin = true)) {
		resetF();
	}
	console.log(`guess:${guestGuess}`);
	console.log(`answer:${theAnswer}`);
	console.log(`*******************`);
	//reset guess answer
	guestGuess = [];
	guess.value = '';
});
//make the answer arr
function random(max) {
	return Math.floor(Math.random() * max);
}
function makeAnswer(num) {
	let answerNumber = [];
	const numRef = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (let i = 0; i < num; i++) {
		answerNumber.push(
			parseInt(numRef.splice(Math.floor(Math.random() * numRef.length), 1))
		);
	}
	return answerNumber;
}

//RESET FUNCTION
function resetF() {
	guess.value = '';
	theAnswer = makeAnswer(guessNumber.value);
	let remove = answerHistory.children.length;
	guessA = 0;
	guessB = 0;
	answerA.innerHTML = guessA;
	answerB.innerHTML = guessB;
	guessBtn.disabled = false;
	isWin = false;
	for (let i = 0; i < remove; i++) {
		answerHistory.children[0].remove();
	}
	console.log(theAnswer);
}

function testNaN(arr) {
	let test = false;
	for (let num of arr) {
		if (isNaN(num) === true) {
			test = true;
		}
	}
	return test;
}
