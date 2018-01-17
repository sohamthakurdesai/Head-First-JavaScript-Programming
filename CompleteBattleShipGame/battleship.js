function init() {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
};

window.onload = init;

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
    var cell = document.getElementById(location)
	cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location)
	cell.setAttribute("class", "miss");
  }
};

var model = {

  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  ships: [{
    locations: ["06", "16", "26"],
    hits: ["", "", ""]
  }, {
    locations: ["24", "34", "44"],
    hits: ["", "", ""]
  }, {
    locations: ["10", "11", "12"],
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
  }

};

var controller = {
  guess: 0,
  parseGuess: function(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
      view.displayMiss("What are you doing? Be serious.");
    } else {
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        view.displayMiss("Ooops!!! Get the map pal!!");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert("Oops, that's off the board!");
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
        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
      }
    }
  }
};
