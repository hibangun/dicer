DICER = (function (window, document) {
  var init = function() {
    bindGeneratePlayer()
    bindStartDicing()
  };

  var players = []

  var bindGeneratePlayer = function() {
    $(document).on('click', '.generate-player-btn', function() {
      generatePlayers()
      $('.start-dicing-btn').removeClass('none')
      $('.dicing-container').addClass('none')

      return false
    })
  }

  var bindStartDicing = function() {
    $(document).on('click', '.start-dicing-btn', function() {
      dicing()
      $('.dicing-container').removeClass('none')

      return false
    })
  }

  var generatePlayers = function() {
    $('.players').empty()

    for(i=0; i<4; i++) {
      var playerDice = []

      for(j=0; j<5; j++) {
        playerDice.push(Math.floor(Math.random()*(6-1+1)+1))
      }

//       playerDice[Math.floor(Math.random()*(5-1+1)+1)] = 1
      players[i] = playerDice
      $('.players').append('<li>Player ' + (i+1) + ':&nbsp&nbsp' + players[i].toString() + '</li>')
    }
  }

  var dicing = function() {
    for(i=0; i<players.length; i++) {
      var onePassed = false // this var for toogle of 1/once
      var oneIndex = -1
      var sixIndexes = []

      for(var j=0; j<players[i].length; j++) {
        if(players[i][j] === 1 && !onePassed && j < players[i].length-1) {
          sixIndexes.push(j)
          if(i === players.length-1) { // if it latest player
            players[0].push(1)
          } else {
            players[i+1].push(1)
          }
          onePassed = true
        }

        if(players[i][j] === 6) {
          sixIndexes.push(j)
        }

        if(j === players[i].length-1) {
          for(var k = sixIndexes.length-1; k>=0; k--) {
            if(sixIndexes[k] < players[i].length-1) {
              players[i].splice(sixIndexes[k], 1); // delete number 6
            }
          }
        }
      }
    }
    checkTheWinner()
  }

  var checkTheWinner = function() {
    $('.players-score').empty()
    for(i=0; i<players.length; i++) {
      $('.players-score').append('<li>Player ' + (i+1) + ':&nbsp&nbsp' + players[i].toString() + '</li>')
    }
  }

  return {
    init: init
  };

})(window, document);

$(function () {
  DICER.init();
});