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
  const lilyPadFinish = 4
  const carsRightDisplay = [54, 57, 60]
  const carsLeftDisplay = [47, 50, 53]
  const roadDisplay = [45, 46, 48, 49, 51, 52, 55, 56, 58, 59, 61, 62]
  const logsLeftDisplay = [18, 19, 20, 23, 24, 25]
  const logsRightDisplay = [28, 29, 30, 33, 34, 35]
  const riverDisplay = [21, 22, 26, 27, 31, 32]




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

  tiles[lilyPadFinish].classList.add('lilypad')

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

  // logsLeftDisplay[0].forEach(log => {
  //   tiles[log].classList.add('log')
  // })

  // logsLeftDisplay[1].forEach(log => {
  //   tiles[log].classList.add('log')
  // })

  // logsRightDisplay[0].forEach(log => {
  //   tiles[log].classList.add('log')
  // })

  // logsRightDisplay[1].forEach(log => {
  //   tiles[log].classList.add('log')
  // })

  riverDisplay.forEach(waterTile => {
    tiles[waterTile].classList.add('water')
  })

  // Rendering game

  function renderGame() {
    tiles.forEach(tile => {
      tile.classList.remove('frog')
    })
    tiles[frogPosition].classList.add('frog')

  }


  // PLAYING THE GAME

  startButton.addEventListener('click', () => {
    // swal({
    //   icon: "warning",
    //   text: `You have ${lives} lives left!`
    // });

    // Creating movement for the frog
    startButton.classList.remove('bob-on-hover')

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

    // Creating game timer

    intervalId = setInterval(() => {
      count = count - 1
      if (count < 1) {
        clearInterval(intervalId)
      }
      timerDisplay.innerHTML = `You have ${count} seconds left!`
      if (count === 0) {
        alert('Game Over!')
        //reset game?
      }
    }, 1000)

    // PLAYER WINS Function - where does this go?

    function playerWins() {
      // if frog reaches lilypad before time runs out
      if (tiles[lilyPadFinish].classList.contains('frog')) {
        console.log('You won!')
        document.removeEventListener('keydown')
      }
    }

    //playerWins()


    // GAME OVER Function  - doesn't quite work?
    // also still going to - figures - how do I fix this?? Kind of a mess

    function gameOver() {
      if (tiles[frogPosition].classList.contains('carsRight') || tiles[frogPosition].classList.contains('carsLeft') ||
        tiles[frogPosition].classList.contains('water')) {
        lives = lives -= 1
        livesDisplay.innerHTML = `Lives Remaining: ${lives}`
        alert(`You have ${lives} lives left!`)
        if (lives === 0) {
          //resetFrog()
          alert('Game Over!')
        }
      }
    }


  })

  // RESET FROG FUNCTION - need help with this/ what it should do

  function resetFrog() {
    tiles[frogPosition].classList.remove('frog')
    tiles[76].classList.add('frog')
  }

  // CREATING CAR MOVEMENT

  // Moving cars right

  function moveCarsRight() {
    setInterval(() => {
      carsRightDisplay.forEach((car, i) => {
        tiles[carsRightDisplay[i]].classList.remove('carsRight')
        tiles[carsRightDisplay[i]].classList.add('road')
        if (car === 62) {
          carsRightDisplay[i] = 54

        } else {
          carsRightDisplay[i] += 1

        }
        tiles[carsRightDisplay[i]].classList.add('carsRight')
        tiles[carsRightDisplay[i]].classList.remove('road')

      })
    }, 1000)
  }

  moveCarsRight()

  // Moving cars left

  function moveCarsLeft() {
    setInterval(() => {
      carsLeftDisplay.forEach((car, i) => {
        tiles[carsLeftDisplay[i]].classList.remove('carsLeft')
        tiles[carsLeftDisplay[i]].classList.add('road')
        if (car === 45) {
          carsLeftDisplay[i] = 53
        } else {
          carsLeftDisplay[i] -= 1
        }
        tiles[carsLeftDisplay[i]].classList.add('carsLeft')
        tiles[carsLeftDisplay[i]].classList.remove('road')
      })
    }, 1000)
  }

  moveCarsLeft()

  // CREATING LOG MOVEMENT

  //Moving logs right

  function moveLogsRight() {
    setInterval(() => {
      for (let i = 0; i < logsRightDisplay.length; i++) {
        tiles[logsRightDisplay[i]].classList.remove('log')
        tiles[logsRightDisplay[i]].classList.add('water')

      }
      for (let i = 0; i < logsRightDisplay.length; i++) {
        if (logsRightDisplay[i] === 35) {
          logsRightDisplay[i] = 27
        } else {
          logsRightDisplay[i] += 1
        }

      }
      for (let i = 0; i < logsRightDisplay.length; i++) {
        tiles[logsRightDisplay[i]].classList.add('log')
        tiles[logsRightDisplay[i]].classList.remove('water')

      }

    }, 1000)
  }

  moveLogsRight()

  // function moveLogsRight() {
  //   setInterval(() => {
  //     logsRightDisplay.forEach((log, i) => {
  //       tiles[logsRightDisplay[i]].classList.remove('log')
  //       tiles[logsRightDisplay[i]].classList.add('water')
  //       if (log === 35) {
  //         logsRightDisplay[i] = 27
  //       } else {
  //         logsRightDisplay[i] += 1
  //       }
  //       tiles[logsRightDisplay[i]].classList.add('log')
  //       tiles[logsRightDisplay[i]].classList.remove('water')
  //     })
  //   }, 1000)
  // }

  //moveLogsRight()



  // Moving logs left
  

  function moveLogsLeft() {
    setInterval(() => {
      logsLeftDisplay.forEach((log, i) => {
        if (log === frogPosition) {
          if (log === 18) {
            //alert('DEAD')
          } else {
            // if frog is on log, need to remove both classes and add water
            tiles[frogPosition].classList.remove('frog')
            tiles[logsLeftDisplay[i]].classList.remove('log')
            tiles[logsLeftDisplay[i]].classList.add('water')
            // move them back one step
            logsLeftDisplay[i] -= 1
            frogPosition -= 1
            // once moved add them back, so they appear....
            tiles[frogPosition].classList.add('frog')
            tiles[logsLeftDisplay[i]].classList.add('log')
            tiles[logsLeftDisplay[i]].classList.remove('water')
          }
        } else {
          tiles[logsLeftDisplay[i]].classList.remove('log')
          tiles[logsLeftDisplay[i]].classList.add('water')
          if (log === 18) {
            logsLeftDisplay[i] = 26
          } else {
            logsLeftDisplay[i] -= 1
          }
          tiles[logsLeftDisplay[i]].classList.add('log')
          tiles[logsLeftDisplay[i]].classList.remove('water')
        }
      })
    }, 1000)
  }

  moveLogsLeft()

  // MOVING FROG WITH LOGS

  //Left 

  // WHYYYYYYY

  function frogWithLogLeft() {
    if (tiles[frogPosition].classList.contains('log') && tiles[frogPosition].classList.contains('frog')) {
      tiles[frogPosition].classList.remove('frog')
      frogPosition -= 1
      tiles[frogPosition].classList.add('frog')
    } else if (tiles[frogPosition] === 18) {
      alert('Game Over')
    }
  }
  frogWithLogLeft()



  // function frogWithLogLeft() {
  //   if (tiles[frogPosition] >= 18 && tiles[frogPosition] < 26) {
  //     tiles[frogPosition].classList.remove('frog')
  //     frogPosition -= 1
  //     tiles[frogPosition].classList.add('frog')

  //   }
  // }

  //Right



  // RULES MODAL

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