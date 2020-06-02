function setUpGame() {

  const grid = document.querySelector('.grid')
  const timerDisplay = document.querySelector('.timer')
  const startButton = document.querySelector('button')
  const livesDisplay = document.querySelector('.lives')

  let count = 30
  let lives = 3
  let intervalId = 0

  let frogPosition = 76
  const width = 9
  const tiles = []
  const lilyPadFinish = [1, 4, 7]
  const carsRightDisplay = [54, 57, 60]
  const carsLeftDisplay = [47, 50, 53]
  const roadDisplay = [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62] // change to all
  const logsLeftDisplay = [18, 19, 20, 23, 24, 25]
  const logsRightDisplay = [28, 29, 30, 33, 34, 35]
  const riverDisplay = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35] // change to all

  let lilyPadInterval
  let logsLeftInterval
  let logsRightInterval
  let carsRightInterval
  let carsLeftInterval


  //Creating tiles on grid
  for (let i = 0; i < width ** 2; i++) {
    const tile = document.createElement('div')
    tile.classList.add('tile')
    grid.appendChild(tile)
    tile.innerHTML = i
    tiles.push(tile)
  }

  //Placing/ creating all of the pieces on grid

  tiles[frogPosition].classList.add('frog')

  lilyPadFinish.forEach(lilypad => {
    tiles[lilypad].classList.add('lilypad')
  })

  carsRightDisplay.forEach(car => {
    tiles[car].classList.add('carsRight')
  })

  carsLeftDisplay.forEach(car => {
    tiles[car].classList.add('carsLeft')
  })

  roadDisplay.forEach(road => {
    tiles[road].classList.add('road')
  })

  logsRightDisplay.forEach(log => {
    tiles[log].classList.add('log')
  })

  logsLeftDisplay.forEach(log => {
    tiles[log].classList.add('log')
  })

  riverDisplay.forEach(waterTile => {
    tiles[waterTile].classList.add('water')
  })

  // ------ RENDERING GAME - DOM ELEMENTS ------ //

  function renderGame() {
    tiles.forEach(tile => {
      tile.classList.remove('frog')
      //strip everything off of your board
      tile.classList.remove('log')
      tile.classList.remove('water')
      tile.classList.remove('carsRight')
      tile.classList.remove('carsLeft')
      tile.classList.remove('road')
      tile.classList.remove('lilypad')
    })
    tiles[frogPosition].classList.add('frog')
    // add them back based on your logic, logs in array, 
    // loops through logs display left and right for each
    logsLeftDisplay.forEach((logPosition) => {
      tiles[logPosition].classList.add('log')
    })
    logsRightDisplay.forEach((logPosition) => {
      tiles[logPosition].classList.add('log')
    })
    riverDisplay.forEach((riverPosition) => {
      tiles[riverPosition].classList.add('water')
    })
    carsLeftDisplay.forEach((carPosition) => {
      tiles[carPosition].classList.add('carsLeft')
    })
    carsRightDisplay.forEach((carPosition) => {
      tiles[carPosition].classList.add('carsRight')
    })
    roadDisplay.forEach((roadPosition) => {
      tiles[roadPosition].classList.add('road')
    })
    lilyPadFinish.forEach((lilypadPosition) => {
      tiles[lilypadPosition].classList.add('lilypad')
    })

  }


  // ------- PLAYING THE GAME ------- //

  startButton.addEventListener('click', () => {
    // swal({
    //   icon: "warning",
    //   text: `You have ${lives} lives left!`
    // });
    startButton.classList.remove('bob-on-hover')

    // Creating movement for the frog

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        if (frogPosition === tiles.length - 1) {
          return
        }
        frogPosition += 1
        renderGame()
        gameOver()

      } else if (e.key === 'ArrowLeft') {
        if (frogPosition === 0) {
          return
        }
        frogPosition -= 1
        renderGame()
        gameOver()

      } else if (e.key === 'ArrowUp') {
        if (frogPosition < width) {
          return
        }
        frogPosition -= width
        renderGame()
        gameOver()

      } else if (e.key === 'ArrowDown') {
        if (frogPosition > (tiles.length - width - 1)) {
          return
        }
        frogPosition += width
        renderGame()
        gameOver()

      }
    })

    // ------ GAME TIMER ------ //

    intervalId = setInterval(() => {
      count = count - 1
      if (count < 1) {
        //not working ??
        clearInterval(intervalId)
      }
      timerDisplay.innerHTML = `You have ${count} seconds left!`
      if (count === 0) {
        resetGame()
      }
    }, 1000)

    // ------ CALLING FUNCTIONS ------ //
    // Small delay ???

    moveCarsRight()
    moveCarsLeft()
    moveLogsRight()
    moveLogsLeft()
    moveLilyPads()

  })

  // ------ GAME FUNCTIONS ------ //

  // ------ Player Wins ------ //

  function playerWins() {
    if (tiles[frogPosition].classList.contains('lilyPad')) {
      console.log('you won')
    }
  }
  // does this need to be called somewhere specific?

  // ------- Game Over ------ //


  function gameOver() {
    if (tiles[frogPosition].classList.contains('road') && tiles[frogPosition].classList.contains('carsLeft')
      || tiles[frogPosition].classList.contains('carsRight')) {
      resetFrog()
      // lives = lives -= 1
      // livesDisplay.innerHTML = `Lives Remaining: ${lives}`
      // alert(`You have ${lives} lives left!`)
      // if (lives === 0) {
      //   resetGame()
      // }
    }
    if (tiles[frogPosition].classList.contains('water') && !tiles[frogPosition].classList.contains('lilypad') && !tiles[frogPosition].classList.contains('log')) {
      resetFrog()
      // lives = lives -= 1
      // livesDisplay.innerHTML = `Lives Remaining: ${lives}`
      // alert(`You have ${lives} lives left!`)
      // if (lives === 0) {
      //   resetGame()
      // }
    }
  }

  // ------ Reset Game (kind of) ------ //
  // veeeeery glitchy doesn't reset everything
  //called when lives === 0, or time has ran out 
  function resetGame() {
    alert('Game Over!')
    
    clearInterval(intervalId)
    
    // clear all movement intervals???
    // can you put all in one set interval??
    clearInterval(lilyPadInterval)
    clearInterval(carsRightInterval)
    clearInterval(carsLeftInterval)
    clearInterval(logsLeftInterval)
    clearInterval(logsRightInterval)
    
    document.removeEventListener('keydown', event)
    document.removeEventListener('click', event)

    //frog isn't returning to starting position


    // count = 30
    // lives = 3
    // timerDisplay.innerHTML = `You have ${count} seconds left!`
    // livesDisplay.innerHTML = `Lives Remaining: ${lives}`
  
  }


  // ------ Reset Frog ------ //
  // When you lose a life - if lives == 0 call resetGame function [see above]

  function resetFrog() {
    //removes frog from current position and places it back at starting position
    frogPosition = 76
    lives = lives -= 1
    livesDisplay.innerHTML = `Lives Remaining: ${lives}`
    alert(`You have ${lives} lives left!`)
    if (lives === 0) {
      resetGame()
    }
    
  }
 
  // ------ MOVING PIECES SECTION ------ //

  // ------ Lilypad Movement ------ //

  function moveLilyPads() {
    lilyPadInterval = setInterval(() => {
      lilyPadFinish.forEach((lilypad, i) => {
        if (lilypad === 8) {
          lilyPadFinish[i] = 0

        } else {
          lilyPadFinish[i] += 1
        }
      })
      renderGame()
    }, 500)

  }

  // ------ CAR MOVEMENT ------ //

  // ------ Moving cars right ------ //

  function moveCarsRight() {
    carsRightInterval = setInterval(() => {
      carsRightDisplay.forEach((car, i) => {
        // tiles[carsRightDisplay[i]].classList.remove('carsRight')
        // tiles[carsRightDisplay[i]].classList.add('road')
        if (car === 62) {
          carsRightDisplay[i] = 54
        } else {
          carsRightDisplay[i] += 1
        }
      })
      renderGame()
    }, 1000)
  }

  // ------ Moving cars left ------ //

  function moveCarsLeft() {
    carsLeftInterval = setInterval(() => {
      carsLeftDisplay.forEach((car, i) => {
        // tiles[carsLeftDisplay[i]].classList.remove('carsLeft')
        // tiles[carsLeftDisplay[i]].classList.add('road')
        if (car === 45) {
          carsLeftDisplay[i] = 53
        } else {
          carsLeftDisplay[i] -= 1
        }
        // tiles[carsLeftDisplay[i]].classList.add('carsLeft')
        // tiles[carsLeftDisplay[i]].classList.remove('road')
      })
      renderGame()
    }, 1000)
  }

  // ------ LOG MOVEMENT ------ //

  // ------ Moving logs right, inc. frog with log ------ //

  // ------ THERE IS A GLITCH HERE AROUND TILES 32 ------ //

  // moveLogsRight()

  function moveLogsRight() {
    logsRightInterval = setInterval(() => {
      logsRightDisplay.forEach((log, i) => {
        if (log === frogPosition) {
          if (log === 35) {
            logsRightDisplay[i] = 27
            
            resetFrog()
            
          } else if (log !== 35) {
            logsRightDisplay[i] += 1
            frogPosition += 1
          } else {
            logsRightDisplay[i] += 1
          }

        } else {
          if (log === 35) {
            logsRightDisplay[i] = 27
          } else {
            logsRightDisplay[i] += 1
          }
        }
      })
      renderGame()
    }, 1000)
  }

  // ------ Moving logs left inc. frog with log movement ------ //

  function moveLogsLeft() {
    logsLeftInterval = setInterval(() => {
      logsLeftDisplay.forEach((log, i) => {
        //if the log has the frog on it
        if (log === frogPosition) {
          //if the log has the frog on it and the index of the tile is 18 (far left)
          if (log === 18) {
            logsLeftDisplay[i] = 26
            resetFrog()
            //game over lose lives function
            //has to go below or logs won't reset - you want logs to move on then frog dies
            // if the log index isn't 18 continue to move frog with log
          } else if (log !== 18) {
            // move them back one step
            logsLeftDisplay[i] -= 1
            frogPosition -= 1
            // once moved add them back, so they appear again on next tile (continuous movement)
            //if frog is no longer there continue to loop logs
          } else {
            logsLeftDisplay[i] -= 1
          }
          // if frog was never there loop logs left
        } else {
          if (log === 18) {
            logsLeftDisplay[i] = 26

          } else {
            logsLeftDisplay[i] -= 1

          }
        }
      })
      renderGame()
    }, 1000)
  }




  // ------ RULES MODAL ------ //
  // edit later 

  const modal = document.querySelector('.modal')
  const rules = document.querySelector('.rules')
  const closeButton = document.querySelector('.close-button')

  function toggleModal() {
    modal.classList.toggle('show-modal')
  }

  function windowOnClick(event) {
    if (event.target === modal) {
      toggleModal()
    }
  }

  rules.addEventListener('click', toggleModal)
  closeButton.addEventListener('click', toggleModal)
  window.addEventListener('click', windowOnClick)


}



// figure out co-ords of right wall length of array % width = 0 .... use googl
// figure out co-ords of left wall % width will return 0     
//.... all numbers right wall % width (-1) will return 0

//if left wall true move carsRightDisplay, if right wall move left

//save to variables  leftwall ==== this module

//2 booleans right wall and left wall
// so if its right wall makes true...

















window.addEventListener('load', setUpGame)