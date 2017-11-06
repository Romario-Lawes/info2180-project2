	//Extra feature - MULTIPLE BACKGROUNDS [See select-box beside shuffle button on page]
"use strict";
window.onload = function () {

	//Prepend "https:" to W3C image links in index.html to display their images
	function fixW3C_Images() {
		let w3cImg = document.getElementsByTagName("img");
		let w3cLink = document.getElementsByTagName("a");
		for (let i = 0; i < w3cImg.length; i++) {
			w3cImg[i].src = "https:" + w3cImg[i].src.substring(5);
			w3cLink[i].href = "https:" + w3cLink[i].href.substring(5);
		}
	}

	//Main function
	function launch() {
		let puzzlePieces = document.getElementById("puzzlearea").children;
		let emptySquare = [4,4];

		//Sorts puzzle pieces in correct order with background and runs multipleBackgrounds function to add multiple backgrounds feature
		function initPuzzle() {
			let offsetX = 0, offsetY = 0, offsetBGX = 0, offsetBGY = 0;
			let range = 4, x = 0, i = 0, posX = 1, posY = 1;

			for (let i = 0; i < puzzlePieces.length; i++) {
				puzzlePieces[i].className = "puzzlepiece";
				puzzlePieces[i].style.backgroundPosition = "100px 100px";
			}

			for (let row = 0; row < 4; row++) {
				for (i = x; i < range; i++) {
					if (i === 15) {continue;}
					puzzlePieces[i].style.left = offsetX + "px";
					puzzlePieces[i].style.top = offsetY + "px";
					puzzlePieces[i].style.backgroundPosition = `${offsetBGX + "px"} ${offsetBGY + "px"}`;
					puzzlePieces[i].setAttribute("id", "square_" + posX + "_" + posY);
					puzzlePieces[i].setAttribute("row", posX);
					puzzlePieces[i].setAttribute("col", posY);
					offsetX += 100;
					offsetBGX -= 100;
					posY += 1
				}
				offsetX = 0;
				offsetBGX = 0;
				offsetY += 100;
				offsetBGY -= 100;
				x += 4;
				range += 4;
				posY = 1;
				posX += 1;
			}
			multipleBackgrounds();
		}

		//Checks if clicked piece neighbours empty square and swaps movable piece position with empty square
		function move() {
			let tempVal = [];
			let row = parseInt(this.getAttribute("row"));
			let col = parseInt(this.getAttribute("col"));

			if (
			((row - 1) === emptySquare[0] && col === emptySquare[1]) ||
			((row + 1) === emptySquare[0] && col === emptySquare[1]) ||
			(row === emptySquare[0] && (col - 1) === emptySquare[1]) ||
			(row === emptySquare[0] && (col + 1) === emptySquare[1]))
			{
					tempVal[0] = emptySquare[0];
					tempVal[1] = emptySquare[1];
					emptySquare[0] = row;
					emptySquare[1] = col;
					this.setAttribute("id", "square_" + tempVal[0] + "_" + tempVal[1]);
					this.setAttribute("row", tempVal[0]);
					this.setAttribute("col", tempVal[1]);
					this.style.top = ((tempVal[0] - 1) * 100) + "px";
					this.style.left =  ((tempVal[1] - 1) * 100) + "px";
			}
			removeHighlight();
			highlightMovable();
		}

		//Attaches onclick event to all puzzle pieces with 'move' function and shuffle button with 'shuffle' function
		function setClickEvents() {
			for (let i = 0; i < puzzlePieces.length; i++) {
				puzzlePieces[i].addEventListener("click", move);
			}
			document.getElementById("shufflebutton").addEventListener("click", shuffle);
		}

		//Adds 'movablepiece' class to pieces that can be moved which highlights them when the mouse hovers over them
		function highlightMovable() {
			let row = 0, col = 0;
			for (let i = 0; i < puzzlePieces.length; i++) {
				row = parseInt(puzzlePieces[i].getAttribute("row"));
				col = parseInt(puzzlePieces[i].getAttribute("col"));
				if (
				((row - 1) === emptySquare[0] && col === emptySquare[1]) ||
				((row + 1) === emptySquare[0] && col === emptySquare[1]) ||
				(row === emptySquare[0] && (col - 1) === emptySquare[1]) ||
				(row === emptySquare[0] && (col + 1) === emptySquare[1]))
				{
					puzzlePieces[i].className += " movablepiece";
				}
			}
		}

		//Removes 'movablepiece' class from puzzle pieces
		function removeHighlight() {
			for (let i = 0; i < puzzlePieces.length; i++) {
				if (puzzlePieces[i].className.includes("movablepiece")) {
					puzzlePieces[i].classList.remove("movablepiece");
				}
			}
		}

		//Shuffles algorithm - randomly chooses a movable piece and swaps position with empty space a couple hundred times.
		function shuffle() {
			let tempVal = [], movablePieces = [];
			let index = 0, row = 0, col = 0;
			let steps = Math.floor((Math.random() * (500 - 200 + 1)) + 200);
			//"steps" variable stores a random number between 200 and 500.
			//Used in for loop below to set the total number of steps/moves when shuffling puzzle pieces
			for (let n = 0; n < steps; n++) {
				for (let i = 0; i < puzzlePieces.length; i++) {
					row = parseInt(puzzlePieces[i].getAttribute("row"));
					col = parseInt(puzzlePieces[i].getAttribute("col"));
					if (
					((row - 1) === emptySquare[0] && col === emptySquare[1]) ||
					((row + 1) === emptySquare[0] && col === emptySquare[1]) ||
					(row === emptySquare[0] && (col - 1) === emptySquare[1]) ||
					(row === emptySquare[0] && (col + 1) === emptySquare[1]))
					{
						movablePieces.push(puzzlePieces[i]);
					}
				}
				index = Math.floor(Math.random() * movablePieces.length);
				tempVal[0] = emptySquare[0];
				tempVal[1] = emptySquare[1];
				emptySquare[0] = parseInt(movablePieces[index].getAttribute("row"));
				emptySquare[1] = parseInt(movablePieces[index].getAttribute("col"));
				movablePieces[index].setAttribute("id", "square_" + tempVal[0] + "_" + tempVal[1]);
				movablePieces[index].setAttribute("row", tempVal[0]);
				movablePieces[index].setAttribute("col", tempVal[1]);
				movablePieces[index].style.top = ((tempVal[0] - 1) * 100) + "px";
				movablePieces[index].style.left =  ((tempVal[1] - 1) * 100) + "px";
			}
			removeHighlight();
			highlightMovable();
		}

		//Extra feature - MULTIPLE BACKGROUNDS - Implements functionality to select multiple background images
		function multipleBackgrounds() {
			let hostURL = "https://raw.githubusercontent.com/Romario-Lawes/info2180-project2/master/backgrounds/";
			let imgNames = ["apple", "goku", "instagram", "luigi", "mario", "naruto", "sonic"];
			let imgURLs = [];
			let random = 0;
			let select = document.createElement("select");
			let option = document.createElement("option");

			select.appendChild(option);

			for (let i = 0; i < imgNames.length; i++) {
				imgURLs.push([imgNames[i], hostURL + imgNames[i] + ".jpg"]);
				option = document.createElement("option");
				option.value = imgNames[i];
				option.innerHTML = imgNames[i].charAt(0).toUpperCase() + imgNames[i].slice(1);
				select.appendChild(option);
			}

			option = document.createElement("option");
			select.id = "background";
			option.value = "default";
			option.innerHTML = "Default";
			select.appendChild(option);

			document.getElementById("controls").appendChild(select);

			document.getElementById("background").addEventListener("change", function() {
				if (this.value === "default") {
					for (let i = 0; i < puzzlePieces.length; i++) {
						puzzlePieces[i].style.backgroundImage = "url('background.jpg')";
					}
				} else {
					for (let i = 0; i < imgURLs.length; i++) {
						if (imgURLs[i][0] === this.value) {
							for (let x = 0; x < puzzlePieces.length; x++) {
								puzzlePieces[x].style.backgroundImage = "url('" + imgURLs[i][1] + "')";
							}
							break;
						}
					}
				}
			});

			//Implements functionality to select random image on startup
			random = Math.floor(Math.random() * (imgURLs.length + 1));
			if (random === imgURLs.length) {
				for (let i = 0; i < puzzlePieces.length; i++) {
					puzzlePieces[i].style.backgroundImage = "url('background.jpg')";
				}
			} else {
				for (let i = 0; i < puzzlePieces.length; i++) {
					puzzlePieces[i].style.backgroundImage = "url('" + imgURLs[random][1] + "')";
				}
			}
		}

		initPuzzle();
		setClickEvents();
		highlightMovable();
	}

	launch();
	fixW3C_Images();
};
