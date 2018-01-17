function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;

  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
};

window.onload = init;

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

};

var view = {
  displayMessage: function(msg) {

    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;

  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
	if(cell.getAttribute("class") === "hit"){
		alert("You have already hit it, why are you wasting the ammunition!!!");
	}
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
	if(cell.getAttribute("class") === "miss"){
		alert("Are you dumb!!!");
	}
    cell.setAttribute("class", "miss");
  }
};

var model = {

  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [{
    locations: [0, 0, 0],
    hits: ["", "", ""]
  }, {
    locations: [0, 0, 0],
    hits: ["", "", ""]
  }, {
    locations: [0, 0, 0],
    hits: ["", "", ""]
  }],
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },


  fire: function(guess) {
    if (this.shipsSunk === this.numShips) {
      alert("Game Over. Kindly Reload");
    }
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var locations = ship.locations;
      var index = locations.indexOf(guess);
      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          this.shipsSunk++;
          view.displayMessage("You sank my battleship!");
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("MISS!");
    return false;
  },

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }
    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },

  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

};

var controller = {
  guess: 0,
  parseGuess: function(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
      view.displayMessage("What are you doing? Be serious. Range : A0-G6");
    } else {
      firstChar = guess.charAt(0);
      var upperFirstChar = firstChar.toUpperCase();
      var row = alphabet.indexOf(upperFirstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        view.displayMessage("Ooops!!! Get the map pal!!");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        view.displayMessage("Oops, that's off the board!");
      } else {
        return row + column;
      }
      return null;
    }
  },
  processGuess: function(guess) {
    var location = this.parseGuess(guess);
    if (location) {
      this.guess++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships, in " + this.guess + " guesses");
        var grid = document.getElementsByTagName("td");
        var hitCount = 0;
        for (var i = 0; i < grid.length; i++) {
          if (grid[i].getAttribute("class") === "hit") {
            hitCount++;
          }
        }
        var accuracy = hitCount * 100 / this.guess;
        setTimeout(function() {
          view.displayMessage("Accuracy:" + accuracy + "%");
        }, 5000);
      }
    }
  }
};