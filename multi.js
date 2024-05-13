var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  
  if (currentTab >= x.length) {
    calculateAndDisplayHappinessScore();
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  var x, y, i, radioGroups, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("question");
  
  const errorMessages = x[currentTab].getElementsByClassName("error-message");
  for (const errorMessage of errorMessages) {
    errorMessage.style.display = 'none';
  }
  
  for (i = 0; i < y.length; i++) {
    radioGroups = y[i].getElementsByTagName("input");
    if (!Array.from(radioGroups).some(radio => radio.checked)) {
      const errorMessage = y[i].getElementsByClassName("error-message")[0];
      errorMessage.textContent = "Please make a selection for this question.";
      errorMessage.style.display = 'block';
      valid = false;
    }
  }
  
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}



function calculateAndDisplayHappinessScore() {
    var totalScore = 0;
    var questions = document.getElementsByClassName("question");
  
    // Define negatively worded questions by their index (assume questions start at index 0)
    var negativeQuestions = [0, 4, 5, 9, 12, 13, 18, 22, 23, 26, 27, 28]; 
  
    for (var i = 0; i < questions.length; i++) {
      var radios = questions[i].getElementsByTagName("input");
      for (var j = 0; j < radios.length; j++) {
        if (radios[j].checked) {
          var score = parseInt(radios[j].value, 10);
          
          // Reverse the score for negatively phrased questions
          if (negativeQuestions.includes(i)) {
            score = 5 - score;
          }
          
          totalScore += score;
          break;
        }
      }
    }
  
    // Proceed with your existing code for calculating happinessLevel and displaying results...
    var happinessLevel = calculateHappinessLevel(totalScore);
    displayHappinessResult(happinessLevel);
    
  }
  



function calculateHappinessLevel(score) {
  var maxScore = 29 * 5; // Update this with the actual number of questions and max score per question
  return (score / maxScore) * 100;
}

function displayHappinessResult(happinessLevel) {
    var form = document.getElementById("form");
    
    // Create and style the result container if it doesn't exist
    var resultContainer = document.getElementById("result-container");
    if (!resultContainer) {
        resultContainer = document.createElement("div");
        resultContainer.id = "result-container";
        document.body.appendChild(resultContainer);
    }
    
    // Create and style the progress bar if it doesn't exist
    var progressBar = document.getElementById("happiness-progress");
    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.id = "happiness-progress";
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "#ddd";
        resultContainer.appendChild(progressBar);
    }
    
    // Create and style the inner bar that will show the happiness level
    var innerBar = document.getElementById("happiness-level");
    if (!innerBar) {
        innerBar = document.createElement("div");
        innerBar.id = "happiness-level";
        innerBar.style.height = "20px"; // The height of the progress bar
        progressBar.appendChild(innerBar);
    }
    
    // Set the width of the inner bar according to the happiness level
    innerBar.style.width = happinessLevel.toFixed(2) + "%";
    
    // Set background color of the inner bar depending on happiness level
    // Light red for less than 50%, light green for 50% and above
    var color = happinessLevel < 50 ? "#ffcccb" : "#98fb98";
    innerBar.style.backgroundColor = color;
    
    // Create and style the score text if it doesn't exist
    var scoreText = document.getElementById("happiness-score");
    if (!scoreText) {
        scoreText = document.createElement("div");
        scoreText.id = "happiness-score";
        scoreText.style.textAlign = "center";
        resultContainer.appendChild(scoreText);
    }
    
    // Set the text content to the calculated score
    scoreText.textContent = "Your happiness score is: " + happinessLevel.toFixed(2) + "%";
    
    // Choose and set the notes based on happiness level
    var noteText;
    if (happinessLevel >= 75) {
        noteText = 'You seem very happy. Keep up the good vibes!';
    } else if (happinessLevel >= 50) {
        noteText = 'You are halfway to maximum happiness. Stay positive, things will get better!';
    } else if (happinessLevel >= 25) {
        noteText = "Things don't look so bright. Keep your chin up!";
    } else {
        noteText = 'Sorry you’re feeling down. Hope things get better soon!';
    }

    // Create and style the note text if it doesn't exist
    var noteElem = document.getElementById("happiness-note");
    if (!noteElem) {
        noteElem = document.createElement("div");
        noteElem.id = "happiness-note";
        noteElem.style.textAlign = "center";
        noteElem.style.marginTop = "10px";
        resultContainer.appendChild(noteElem);
    }
    
    // Set the text content to the selected note
    noteElem.textContent = noteText;
    
    // Hide the form
    form.style.display = "none";
}




