$(document).ready(function() {
  let playersPrefix = ["p1", "p2", "p3", "p4"];
  let playersArray = ["P1", "P2", "P3", "P4"];

  $("#enterNames").click(function() {
    for (let i = 0; i < playersPrefix.length; i++) {
      let playerName = $(`#${playersPrefix[i]}`).val();
      if (playerName.length > 0) {
        playersArray[i] = playerName;
      }
      $(`#${playersPrefix[i]}TableTitle`).html(playersArray[i]);
    }
  });

  $("#resetSession, #enterNames").click(function() {
    document.getElementById("form_player_name").reset();
    $("#player_names").toggle(10);
    $("#scoreDiv").toggle(10);
    $("#messageTitle").html("Enter the names of new players");
    $("#p1Score, #p2Score, #p3Score, #p4Score").val("");
  });

  $("#resetSession").click(function() {
    playersArray = ["P1", "P2", "P3", "P4"];
  });

  let playerScoreSums = [0, 0, 0, 0];
  let roundNumber = 0;
  let beforeRound = true;
  let roundRomanNumber = [
    "i",
    "ii",
    "iii",
    "iv",
    "<span class='text-danger'>final</span>"
  ];
  let $insertScoreSelector = $("#insertScore");

  $("#newGame, #resetSession").click(function() {
    $insertScoreSelector.prop("disabled", false);
    $(
      "#canRemoveRow_0, #canRemoveRow_1, #canRemoveRow_2, #canRemoveRow_3, #canRemoveRow_4"
    ).remove();
    playerScoreSums = [0, 0, 0, 0];
    roundNumber = 0;
    $("#p1Score, #p2Score, #p3Score, #p4Score").val("");
    $("#p1Sum, #p2Sum, #p3Sum, #p4Sum").text("0");
    $insertScoreSelector.html("Record Calls");
    $("#gameErrorMessage").html("");
    $("#gameMessage").html("");
    beforeRound = true;
  });

  $("#insertScore").click(function() {
    let ongoingScore = [];
    for (let i = 0; i < playersPrefix.length; i++) {
      ongoingScore[i] = Number($(`#${playersPrefix[i]}Score`).val());
    }

    let didInputValidate = validateInput(ongoingScore, playersPrefix);

    if (didInputValidate) {
      let didScoresValidate = false;
      let didCallsValidate = false;
      if (beforeRound) {
        didCallsValidate = validateCalledScore(ongoingScore);
      } else {
        didScoresValidate = validateWonScore(ongoingScore);
      }

      if (beforeRound && didCallsValidate) {
        $insertScoreSelector.html("Record Hands");
        $("#scoreTable tr:last").before(
          `<tr id="canRemoveRow_${roundNumber}">
           <td class="text-center font-weight-bold">${
             roundRomanNumber[roundNumber]
           }</td><td class="text-center" id="p1TempScore_${roundNumber}">${
            ongoingScore[0]
          }</td><td class="text-center" id="p2TempScore_${roundNumber}">${
            ongoingScore[1]
          }</td><td class="text-center" id="p3TempScore_${roundNumber}">${
            ongoingScore[2]
          }</td><td class="text-center" id="p4TempScore_${roundNumber}">${
            ongoingScore[3]
          }</td>
           </tr>`
        );
      } else if (didScoresValidate) {
        $insertScoreSelector.html("Record Calls");
        let actualScore = computeActualScore(
          roundNumber,
          ongoingScore,
          playersPrefix
        );

        for (let i = 0; i < playersPrefix.length; i++) {
          $(`#${playersPrefix[i]}TempScore_${roundNumber}`).html(
            actualScore[i][1]
          );
          playerScoreSums[i] =
            Math.round((playerScoreSums[i] + Number(actualScore[i][0])) * 10) /
            10;
          let bonusScore = playerScoreSums[i] % 1;
          if (bonusScore >= 0.8) {
            playerScoreSums[i] =
              Math.round(
                (Math.ceil(playerScoreSums[i]) + bonusScore - 0.8) * 10
              ) / 10;
          }
          $(`#${playersPrefix[i]}Sum`).html(playerScoreSums[i]);
        }

        roundNumber = Number(roundNumber + 1);
        if (roundNumber === 5) {
          $insertScoreSelector.html("GAME OVER!!!");
          $insertScoreSelector.prop("disabled", true);
          let maxScore = Math.max(...playerScoreSums);
          let winners = [];
          for (let i = 0; i < playerScoreSums.length; i++) {
            if (playerScoreSums[i] === maxScore) {
              winners.push(playersArray[i]);
            }
          }
          if (winners.length === 1) {
            $("#gameMessage").html(`${winners[0]} is the winner!!!`);
          } else if (winners.length === 2) {
            $("#gameMessage").html(
              `${winners[0]} and ${winners[1]} are the winner!!!`
            );
          } else if (winners.length === 4) {
            $("#gameMessage").html("Well! somehow everyone won.");
          } else {
            $("#gameMessage").html(
              `${winners.slice(0, winners.length - 1).join(", ")}, and ${
                winners[winners.length - 1]
              } are the winners!!!`
            );
          }
        }
      } else if (!didScoresValidate) {
        beforeRound = true;
      }
      beforeRound = !beforeRound;
    }
  });
});
