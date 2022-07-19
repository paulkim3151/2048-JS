const numBoard = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];
const board = [];
const DIRECTION_LEFT = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_UP = 2;
const DIRECTION_DOWN = 3;
const tileElemList = [];
let score = 0;

function boardMake() {
	let newed = false;
	numBoard.forEach((row) => {
		let newRow = [];
		row.forEach((num) => {
			newed = (num === 0) ? false : true;
			newRow.push({
				value: num,
				merged: false,
				newed: newed,
				moved: false,
				destI: -1,
				destJ: -1
			});
		})
		board.push(newRow);
	})
}

function checkMovable(direction) {
	let result = false;
	if (direction === DIRECTION_LEFT) {
		for (let i = 0; i < 4; i += 1) {
			let hole = false;
			for (let j = 0; j < 4; j += 1) {
				if (board[i][j].value === 0) {
					hole = true;
				} else {
					if (hole) {
						return true;
					}
				}
			}
		}
	} else if (direction === DIRECTION_RIGHT) {
		for (let i = 3; i >= 0; i -= 1) {
			let hole = false;
			for (let j = 3; j >= 0; j -= 1) {
				if (board[i][j].value === 0) {
					hole = true;
				} else {
					if (hole) {
						return true;
					}
				}
			}
		}
	} else if (direction === DIRECTION_UP) {
		for (let i = 0; i < 4; i += 1) {
			let hole = false;
			for (let j = 0; j < 4; j += 1) {
				if (board[j][i].value === 0) {
					hole = true;
				} else {
					if (hole) {
						return true;
					}
				}
			}
		}
	} else if (direction === DIRECTION_DOWN) {
		for (let i = 3; i >= 0; i -= 1) {
			let hole = false;
			for (let j = 3; j >= 0; j -= 1) {
				if (board[j][i].value === 0) {
					hole = true;
				} else {
					if (hole) {
						return true;
					}
				}
			}
		}
	}
	return result
}

function checkMerge(direction) {
	if (direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT) {
		for (let i = 0; i < 4; i += 1) {
			for (let j = 0; j < 3; j += 1) {
				if (board[i][j].value === 0) {
					continue;
				}
				if (board[i][j].value === board[i][j + 1].value) {
					return true;
				}
			}
		}
	} else {
		for (let i = 0; i < 3; i += 1) {
			for (let j = 0; j < 4; j += 1) {
				if (board[i][j].value === 0) {
					continue;
				}
				if (board[i][j].value === board[i + 1][j].value) {
					return true;
				}
			}
		}
	}
	return false;
}

function moveTile(direction) {
	// initalized tile value
	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 4; j += 1) {
			board[i][j].merged = false;
			board[i][j].newed = false;
			board[i][j].moved = false;
		}
	}
	switch (direction) {
		case DIRECTION_LEFT:
			// move left
			for (let i = 0; i < 4; i += 1) {
				for (let j = 0; j < 4; j += 1) {
					if (board[i][j].value === 0) {
						continue;
					}
					// moving board[i][j]
					let tile_value = board[i][j].value;
					let destination = -1;
					for (let k = j - 1; k >= 0; k -= 1) {
						if (board[i][k].value === 0) {
							destination = k;
						} else {
							if (board[i][k].value === tile_value && !board[i][k].merged) { //merge
								board[i][k].value *= 2;
								board[i][k].merged = true;
								numMergeTile += 1;
								board[i][j].destI = i;
								board[i][j].destJ = k;
								board[i][j].moved = true;
								board[i][j].value = 0;
								destination = -1;
							} else {
								break;
							}
						}
					}
					if (destination !== -1) {
						board[i][destination].value = tile_value;
						board[i][j].value = 0;
						board[i][j].destI = i;
						board[i][j].destJ = destination;
						board[i][j].moved = true;
					}
				}
			}
			break;
		case DIRECTION_RIGHT:
			// move right
			for (let i = 3; i >= 0; i -= 1) {
				for (let j = 3; j >= 0; j -= 1) {
					if (board[i][j].value === 0) {
						continue;
					}
					// moving board[i][j]
					let tile_value = board[i][j].value;
					let destination = -1;
					for (let k = j + 1; k < 4; k += 1) {
						if (board[i][k].value === 0) {
							destination = k;
						} else {
							if (board[i][k].value === tile_value && !board[i][k].merged) { //merge
								board[i][k].value *= 2;
								board[i][k].merged = true;
								numMergeTile += 1;
								board[i][j].destI = i;
								board[i][j].destJ = k;
								board[i][j].moved = true;
								board[i][j].value = 0;
								destination = -1;
							} else {
								break;
							}
						}
					}
					if (destination !== -1) {
						board[i][destination].value = tile_value;
						board[i][j].value = 0;
						board[i][j].destI = i;
						board[i][j].destJ = destination;
						board[i][j].moved = true;
					}
				}
			}
			break;
		case DIRECTION_UP:
			// move up
			for (let j = 0; j < 4; j += 1) {
				for (let i = 0; i < 4; i += 1) {
					if (board[i][j].value === 0) {
						continue;
					}
					// moving board[i][j]
					let tile_value = board[i][j].value;
					let destination = -1;
					for (let k = i - 1; k >= 0; k -= 1) {
						if (board[k][j].value === 0) {
							destination = k;
						} else {
							if (board[k][j].value === tile_value && !board[k][j].merged) { //merge
								board[k][j].value *= 2;
								board[k][j].merged = true;
								numMergeTile += 1;
								board[i][j].value = 0;
								board[i][j].destI = k;
								board[i][j].destJ = j;
								board[i][j].moved = true;
								destination = -1;
							} else {
								break;
							}
						}
					}
					if (destination !== -1) {
						board[destination][j].value = tile_value;
						board[i][j].value = 0;
						board[i][j].destI = destination;
						board[i][j].destJ = j;
						board[i][j].moved = true;
					}
				}
			}
			break;
		case DIRECTION_DOWN:
			// move down
			for (let j = 3; j >= 0; j -= 1) {
				for (let i = 3; i >= 0; i -= 1) {
					if (board[i][j].value === 0) {
						continue;
					}
					// moving board[i][j]
					let tile_value = board[i][j].value;
					let destination = -1;
					for (let k = i + 1; k < 4; k += 1) {
						if (board[k][j].value === 0) {
							destination = k;
						} else {
							if (board[k][j].value === tile_value && !board[k][j].merged) { //merge
								board[k][j].value *= 2;
								board[k][j].merged = true;
								numMergeTile += 1;
								board[i][j].destI = k;
								board[i][j].destJ = j;
								board[i][j].moved = true;
								board[i][j].value = 0;
								destination = -1;
							} else {
								break;
							}
						}
					}
					if (destination !== -1) {
						board[destination][j].value = tile_value;
						board[i][j].value = 0;
						board[i][j].destI = destination;
						board[i][j].destJ = j;
						board[i][j].moved = true;
					}
				}
			}
			break;
	}
}

function createRandomTile(value = 0) {
	let emptyTile = [];
	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 4; j += 1) {
			if (board[i][j].value === 0) {
				emptyTile.push({ i: i, j: j });
			}
		}
	}
	const selectedTile = emptyTile[Math.floor(Math.random() * emptyTile.length)]
	if (value === 0) {
		value = (Math.random() > 0.9) ? 4 : 2;
	}
	board[selectedTile.i][selectedTile.j].value = value;
	board[selectedTile.i][selectedTile.j].newed = true;
}

function onkeydown(e) {
	if (numMergeTile !== 0 || numMoveTile !== 0) {
		return;
	}
	let isMoved = false;
	let direction = -1;
	if (e.key === "ArrowLeft") {
		direction = DIRECTION_LEFT;
	} else if (e.key === "ArrowRight") {
		direction = DIRECTION_RIGHT;
	} else if (e.key === "ArrowUp") {
		direction = DIRECTION_UP;
	} else if (e.key === "ArrowDown") {
		direction = DIRECTION_DOWN;
	} else {
		return;
	}
	if (checkMovable(direction) || checkMerge(direction)) {
		moveTile(direction);
		moveTileElem();
		createRandomTile();
		drawNewTile();
		checkGameover();
	}
}

function getHighestTileValue() {
	let value = 0;
	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 4; j += 1) {
			if (board[i][j].value > value) {
				value = board[i][j].value;
			}
		}
	}
	return value;
}

function updateLB(name, score, highValue) {
	leaderBoard.push({
		name: name,
		score: score,
		highValue: highValue,
		time: Date.now()
	});
	leaderBoard.sort((a, b) => {
		if (a.score === b.score) {
			if (a.highValue === b.highValue) {
				return a.time - b.time;
			} else {
				return b.highValue - a.highValue;
			}
		} else {
			return b.score - a.score;
		}
	});
	localStorage.setItem("LB2048", JSON.stringify(leaderBoard));
	paintLB();
}

function paintLB() {
	let i = 1;
	const lb = document.querySelector(".leaderboard_container")
	let curItem = lb.firstElementChild;
	leaderBoard.forEach((elem) => {
		if (i >= 10) {
			return;
		}
		let nextItem = curItem.nextElementSibling;
		if (nextItem === null) {
			nextItem = createLB_Item(i, elem.name, elem.score, elem.highValue);
			lb.appendChild(nextItem);
		} else {
			nextItem.querySelector(".leaderboard_name").innerHTML = `${i}. ${elem.name}`;
			nextItem.querySelector(".leaderboard_score").innerHTML = elem.score;
			nextItem.querySelector(".smallTile").innerHTML = elem.highValue;
			nextItem.querySelector(".smallTile").className = `smallTile tile${elem.highValue}`;
		}
		curItem = nextItem;
		i += 1;
	})
}

function createLB_Item(i, name, score, highValue) {
	const lb_item = document.createElement("div");
	const lb_content = document.createElement("div");
	const lb_name = document.createElement("div");
	const lb_score = document.createElement("div");
	const lb_tile = document.createElement("div");
	lb_item.className = "leaderboard_item";
	lb_content.className = "leaderboard_content";
	lb_name.className = "leaderboard_name";
	lb_score.className = "leaderboard_score";
	lb_tile.className = "smallTile";
	lb_tile.innerHTML = highValue;
	lb_tile.classList.add(`tile${highValue}`);
	lb_name.innerHTML = `${i}. ${name}`;
	lb_score.innerHTML = score;
	lb_content.appendChild(lb_name);
	lb_content.appendChild(lb_score);
	lb_item.appendChild(lb_content);
	lb_item.appendChild(lb_tile);
	return lb_item;
}

function checkGameover() {
	for (let direction = 0; direction < 4; direction += 1) {
		if (checkMovable(direction) || checkMerge(direction)) {
			return;
		}
	}
	gameover();
	;
}

function gameover() {
	const overlay = document.querySelector(".overlay");
	overlay.classList.add("gameover");
	const gameOverDialog = document.querySelector(".gameOverDialog");
	gameOverDialog.classList.remove("hidden");
	const scoreForm = gameOverDialog.querySelector("#scoreForm");
	const inputBox = scoreForm.querySelector("input");
	inputBox.focus();
	inputBox.value = "";
	scoreForm.addEventListener("submit", (e) => {
		e.preventDefault();
		updateLB(inputBox.value, score, getHighestTileValue());
		document.querySelector(".overlay").classList.remove("gameover");
		gameOverDialog.classList.add("hidden");
		document.querySelector("#footer").classList.remove("hidden");
	}, { once: true })
}
const boardPos = [];
const tile_container = document.querySelector(".tile_container");
let numMoveTile = 0;
let numMergeTile = 0;

function calculateTileOffset() {
	let temp = [];
	const tileDiv = tile_container.querySelectorAll(".row>div");
	tileDiv.forEach((tile, i) => {
		if (i % 4 === 0) {
			temp = [];
		}
		temp.push({ left: tile.offsetLeft, top: tile.offsetTop });
		if (i % 4 === 3) {
			boardPos.push(temp);
		}
	})
}

function moveTileElem() {
	// Calculate the number of tiles to be moved
	numMoveTile = 0;
	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 4; j += 1) {
			const curTile = board[i][j];
			if (curTile.moved) {
				numMoveTile += 1;
			}
		}
	}
	// Update Tile Position
	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 4; j += 1) {
			const curTile = board[i][j];
			if (curTile.moved) {
				const curTileElem = document.querySelector(`.tile-${i}-${j}`);
				curTileElem.style.left = boardPos[curTile.destI][curTile.destJ].left + "px";
				curTileElem.style.top = boardPos[curTile.destI][curTile.destJ].top + "px";
				curTileElem.classList.remove("newTile");
				curTileElem.addEventListener("transitionend", (e) => {
					//console.log(e.target);
					e.target.classList.replace(`tile-${i}-${j}`, `tile-${curTile.destI}-${curTile.destJ}`);
					numMoveTile -= 1;
				}, { once: true })
				curTile.moved = false;
			}
		}
	}
}

function drawNewTile() {
	//Draw New Tile
	for (let i = 0; i < 4; i += 1) {
		for (let j = 0; j < 4; j += 1) {
			const curTile = board[i][j];
			if (curTile.value !== 0 && curTile.newed) {
				const newTileElem = createNewTileElement(i, j, curTile.value);
				tile_container.appendChild(newTileElem);
			}
		}
	}
}

function createNewTileElement(i, j, value) {
	const newTile = document.createElement("div");
	newTile.classList.add("tile");
	if (value > 2048) {
		newTile.classList.add("tile-super");
	} else {
		newTile.classList.add("tile" + value);
	}
	newTile.classList.add("newTile");
	newTile.classList.add(`tile-${i}-${j}`);
	newTile.style.left = boardPos[i][j].left + "px";
	newTile.style.top = boardPos[i][j].top + "px";
	newTile.innerHTML = value;
	return newTile;
}
function removedTileHandler(e) {
	tile_container.removeChild(e.target);
}

function animationstartHandler(e) {
	const currentValue = e.target.innerHTML;
	if (parseInt(currentValue) === 2048) {
		e.target.classList.remove("tile2048")
		e.target.classList.add("tile-super");
	} else if (parseInt(currentValue) < 2048) {
		e.target.classList.replace("tile" + currentValue, "tile" + currentValue * 2);
	}
	e.target.innerHTML = currentValue * 2;
	addScore(currentValue * 2)
}

function animationendHandler(e) {
	e.target.classList.remove("mergedTile");
	numMergeTile -= 1;
}

function addScore(add_value) {
	score += add_value;
	const scoreElem = document.querySelector(".score");
	scoreElem.innerHTML = score;
	// Score Effect
	const scoreOverlayElem = document.createElement("div");
	scoreOverlayElem.classList.add("score_overlay");
	scoreOverlayElem.innerHTML = `+${add_value}`;
	scoreOverlayElem.style.top = "40px";
	scoreOverlayElem.style.left = "0px";
	const score_wrapper = document.querySelector(".score_wrapper");
	score_wrapper.appendChild(scoreOverlayElem);
	scoreOverlayElem.addEventListener("animationend", scoreAnimationEnd);
}

function scoreAnimationEnd(e) {
	document.querySelector(".score_wrapper").removeChild(e.target);
}

function mergeTileElem(e) {
	if (numMoveTile === 0) {
		// Merge Tile
		for (let i = 0; i < 4; i += 1) {
			for (let j = 0; j < 4; j += 1) {
				const curTileElemList = document.querySelectorAll(`.tile-${i}-${j}`);
				if (curTileElemList.length > 1) {
					const first = curTileElemList[0];
					const second = curTileElemList[1];
					tile_container.removeChild(second);
					first.classList.remove("newTile");
					first.classList.add("mergedTile");
					first.addEventListener('animationstart', animationstartHandler);
					first.addEventListener('animationend', animationendHandler);
				}
			}
		}
	}
}
const savedLeaderBoard = localStorage.getItem("LB2048")
let leaderBoard = (savedLeaderBoard === null ? [] : JSON.parse(savedLeaderBoard));

function Main() {
	calculateTileOffset();
	boardMake();
	moveTileElem();
	createRandomTile(2);
	createRandomTile(2);
	drawNewTile();
	tile_container.addEventListener("transitionend", mergeTileElem);
	paintLB();
	window.addEventListener("keydown", onkeydown);
}
Main();