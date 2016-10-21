DICER = (function (window, document) {
  var init = function() {
    bindGeneratePlayer()
    bindRollPlayer()
    bindStartDicing()
    bindNewGame()
  };

  var players = []

  var bindGeneratePlayer = function() {
    $(document).on('click', '.generate-player-btn', function() {
      generatePlayers()
      $('.start-dicing-btn').removeClass('none')
      $('.dicing-container').addClass('none')
      $(this).addClass('none')
      $('.roll-player-btn').removeClass('none')
      $('.new-game-btn').removeClass('none')
      $('.players-score').removeClass('none')
      $('.players').removeClass('none')
      $('.winner-container').addClass('none')


      return false
    })
  }

  var bindRollPlayer = function() {
    $(document).on('click', '.roll-player-btn', function() {
      rollPlayers()
      $('.start-dicing-btn').removeClass('unclick')
      $(this).addClass('unclick')

      return false
    })
  }

  var bindStartDicing = function() {
    $(document).on('click', '.start-dicing-btn', function() {
      dicing()
      $('.dicing-container').removeClass('none')
      $(this).addClass('unclick')
      $('.roll-player-btn').removeClass('unclick')

      return false
    })
  }

  var bindNewGame = function() {
    $(document).on('click', '.new-game-btn', function() {
      $('.generate-player-btn').removeClass('none')
      $('.start-dicing-btn').addClass('none')
      $('.dicing-container').addClass('none')
      $(this).addClass('none')
      $('.roll-player-btn').addClass('none')
      $('.players-score').addClass('none')
      $('.players').addClass('none')
      $('.roll-player-btn').trigger('click')
      $('.winner-container').addClass('none')
    })
  }

  var generatePlayers = function() {
    $('.players').empty()

    for(i=0; i<4; i++) {
      var playerDice = []

      for(j=0; j<5; j++) {
        var randomValue = Math.floor(Math.random()*(6-1+1)+1)
        var remove = randomValue == 6 ? true : false

        var dice = {
          value: randomValue,
          remove: remove
        }
        playerDice.push(dice)
      }

      players[i] = playerDice
      $('.players').append('<li>Player ' + (i+1) + ':&nbsp&nbsp' + _.map(players[i], 'value').toString() + '</li>')
    }
  }

  var rollPlayers = function() {
    $('.players').empty()

    for(i=0; i<players.length; i++) {
      var playerDice = []

      for(j=0; j<players[i].length; j++) {
        var randomValue = Math.floor(Math.random()*(6-1+1)+1)
        var remove = randomValue == 6 ? true : false

        var dice = {
          value: randomValue,
          remove: remove
        }
        playerDice.push(dice)
      }

      players[i] = playerDice
      $('.players').append('<li>Player ' + (i+1) + ':&nbsp&nbsp' + _.map(players[i], 'value').toString() + '</li>')
    }
  }

  var dicing = function() {
    for(i=0; i<players.length; i++) {
      var onePassed = false // this var for toogle of 1/once

      console.log('------ BEFORE ------')
      console.log(players[i]);
      for(var j=0; j<players[i].length; j++) {
        if(players[i][j].value === 1 && !onePassed && !players[i][j].additional) {
          players[i][j].remove = true

          if(i === players.length-1) { // if it latest player
            players[0].push({value: 1, remove: false, additional: true})
          } else {
            players[i+1].push({value: 1, remove: false, additional: true})
          }

          onePassed = true
        }
      }
      console.log('------ AFTER ------')
      console.log(players[i]);
    }

    checkTheWinner()
  }

  var checkTheWinner = function() {
    $('.players-score').empty()
    var theWinner = []
    for(i=0; i<players.length; i++) {
      players[i] = _.filter(players[i], {'remove': false})
      $('.players-score').append('<li>Player ' + (i+1) + ':&nbsp&nbsp' + _.map(players[i], 'value').toString() + '</li>')

      if(!players[i].length) {
        theWinner.push(i+1)
      }
    }

    if(theWinner.length) {
      $('.players-winner').empty()

      $('.new-game-btn').removeClass('none')
      $('.generate-player-btn').addClass('none')
      $('.start-dicing-btn').addClass('none')
      $('.dicing-container').addClass('none')
      $('.roll-player-btn').addClass('none')
      $('.players-score').addClass('none')
      $('.players').addClass('none')
      $('.winner-container').removeClass('none')

      for(i=0; i<theWinner.length; i++) {
        $('.players-winner').append('<li>Player ' + theWinner[i] + '</li>')
      }
    }
  }

  return {
    init: init
  };

})(window, document);

$(function () {
  DICER.init();
});