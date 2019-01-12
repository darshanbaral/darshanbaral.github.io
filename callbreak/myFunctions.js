function computeActualScore(roundNumber, ongoingScore, playersPrefix) {
  let actualScore = [];
  let calledScore;
  let wonScore;
  for (let i = 0; i < ongoingScore.length; i++) {
    calledScore = $(`#${playersPrefix[i]}TempScore_${roundNumber}`).text();
    wonScore = Number(ongoingScore[i]);
    if (wonScore >= calledScore) {
      actualScore[i] = [
        `${calledScore}.${wonScore - calledScore}`,
        `${calledScore}.${wonScore - calledScore}`
      ];
    } else {
      actualScore[i] = [
        `-${calledScore}`,
        `<i class="text-danger">-${calledScore}</i>`
      ];
    }
  }
  //return `<i class="text-secondary">${calledScore} | </i>${actualScore}`;
  return actualScore;
}

function validateWonScore(scoreArray) {
  let sumScores = scoreArray.reduce(getSum);
  if (sumScores === 13) {
    $("#gameErrorMessage").html("");
    return true;
  } else if (sumScores > 13) {
    $("#gameErrorMessage").html("The sum of hands is greater than 13.");
    return false;
  } else if (sumScores < 13) {
    $("#gameErrorMessage").html("The sum of hands is less than 13.");
    return false;
  }
}

function validateBonusOption(inputValue) {
  inputValue = Number(inputValue);
  if (inputValue >= 5 && inputValue <= 10 && Number.isInteger(inputValue)) {
    $("#bonusTotalOption").removeClass("border-danger");
    return true;
  } else {
    $("#bonusTotalOption").addClass("border-danger");
    return false;
  }
}

function validateInput(scoreArray, playersPrefix) {
  let outputBoolean = true;
  for (let i = 0; i < scoreArray.length; i++) {
    if (
      scoreArray[i] >= 1 &&
      scoreArray[i] <= 10 &&
      Number.isInteger(scoreArray[i])
    ) {
      outputBoolean = outputBoolean && true;
      $(`#${playersPrefix[i]}Score`).removeClass("border-danger");
    } else {
      outputBoolean = outputBoolean && false;
      $(`#${playersPrefix[i]}Score`).addClass("border-danger");
    }
  }
  if (outputBoolean) {
    $("#gameErrorMessage").html("");
  } else {
    $("#gameErrorMessage").html(
      "The input has to be an integer between 1 and 10."
    );
  }
  return outputBoolean;
}

function validateCalledScore(scoreArray) {
  let sumScores = scoreArray.reduce(getSum);
  if (sumScores >= 4 && sumScores <= 17) {
    $("#gameErrorMessage").html("");
    return true;
  } else if (sumScores > 17) {
    $("#gameErrorMessage").html("The sum of called hands is too high.");
    return false;
  } else if (sumScores < 4) {
    $("#gameErrorMessage").html("The sum of called hands is too low.");
    return false;
  }
}

getSum = (total, num) => Number(total) + Number(num);
