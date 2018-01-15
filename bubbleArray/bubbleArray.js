function whetherToProceed() {
  var decision = prompt("Do you want to proceed?");
  if (decision == "yes") {
    var scores = [60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69, 64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18, 41, 53, 55, 61, 51, 44];

    var noBubbleSolutions = prompt("hello kindly enter number of Bubble solutions that you want to test");

    if (noBubbleSolutions != 0) {
      scores = [];
      for (var i = 0; i < noBubbleSolutions; i++) {
        var bubbleScore = prompt("Enter bubble score for solution " + i);
        scores.push(bubbleScore);
      }
    }

    var highScore = printBubbleSolutionsScores(scores);

    document.write("<br/>");
    document.write("Total number of Bubble tests:" + scores.length + "<br/>");
    document.write("Highest bubble score:" + highScore + "<br/>");
    document.write("Solutions with highest score:" + findHighScoreSolutions(scores, highScore) + "<br/>");
  } else {
    console.log("returning the control");
    return;
  }
};

function printBubbleSolutionsScores(scores) {
  //alert("hello...inside printBubbleSolutionsScores");
  //console.log("this is console.log");
  var output;
  var highScore = 0;
  for (var i = 0; i < scores.length; i++) {
    output = "Bubble solution #" + i + " score: " + scores[i];
    document.write(output + "<br/>");
    if (scores[i] > highScore)
      highScore = scores[i];
  }
  return highScore;
};

function findHighScoreSolutions(scores, highScore) {
  var highScoreSolutions = [];
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] === highScore) {
      highScoreSolutions.push(i);
    }
  }
  return highScoreSolutions;
};