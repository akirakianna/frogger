function setUpGame() {

  const grid = document.querySelector('.grid')
  const timerDisplay = document.querySelector('.timer')
  const startButton = document.querySelector('button')
  // const rulesDisplay = document.querySelector('')
  let count = 20
  let intervalId = 0
  const width = 9
  const tiles = []
  let frogPosition = 76
  const lilyPadFinish = 4
  const carsRightDisplay = [54, 57, 60]
  const carsLeftDisplay = [47, 50, 53]
  const roadDisplay = [45, 46, 48, 49, 51, 52, 55, 56, 58, 59, 61, 62]
  const logsLeftDisplay = [[18,19,20], [23, 24, 25]]
  const logsRightDisplay = [[28, 29, 30], [33, 34, 35]]
  const riverDisplay = [21, 22, 26, 27, 31, 32]
  

  


  //Creating tiles on grid
  for (let i = 0; i < width ** 2; i++) {
    const tile = document.createElement('div')
    tile.classList.add('tile')
    grid.appendChild(tile)
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

  logsLeftDisplay[0].forEach(log => {
    tiles[log].classList.add('log')
  })

  logsLeftDisplay[1].forEach(log => {
    tiles[log].classList.add('log')
  })

  logsRightDisplay[0].forEach(log => {
    tiles[log].classList.add('log')
  })

  logsRightDisplay[1].forEach(log => {
    tiles[log].classList.add('log')
  })

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

  // CREATING MOVEMENT FOR FROG
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

    // CREATING GAME TIMER/ COUNTDOWN

    intervalId = setInterval(() => {
      count = count - 1
      if (count < 1) {
        clearInterval(intervalId)
      }
      timerDisplay.innerHTML = `You have ${count} seconds left!`
      if (count === 0) {
        alert('Game Over!')
      }
    }, 1000)

    // GAME OVER Function  - doesn't quite work

    function gameOver() {
      if ((tiles[frogPosition].classList.contains('frog') && tiles[frogPosition].classList.contains('carsRight')) ||
      (tiles[frogPosition].classList.contains('road')) && tiles[frogPosition].classList.contains('carsRight')) {   
        alert('gameOver')
      }
    }

  })

  // CREATING CAR MOVEMENT

  // Moving cars right

  function moveCarsRight() {
    setInterval(() => {
      carsRightDisplay.forEach((car, i) => {
        if (carsRightDisplay[2] <= 61) {
          tiles[carsRightDisplay[i]].classList.remove('carsRight')
          tiles[carsRightDisplay[i]].classList.add('road')
          carsRightDisplay[i] += 1
          tiles[carsRightDisplay[i]].classList.add('carsRight')
          tiles[carsRightDisplay[i]].classList.remove('road')
        } else if (carsRightDisplay[0] > 53 && carsRightDisplay[2] >= 60) {
          tiles[carsRightDisplay[i]].classList.remove('carsRight')
          tiles[carsRightDisplay[i]].classList.add('road')
          carsRightDisplay[i] -= 2
          tiles[carsRightDisplay[i]].classList.add('carsRight')
          tiles[carsRightDisplay[i]].classList.remove('road')
        }
      })
    }, 1000)
  }

  moveCarsRight()

  // Moving cars left

  function moveCarsLeft () {
    setInterval(() => {
      carsLeftDisplay.forEach((car, i) => {
        if (carsLeftDisplay[0] >= 45 && carsLeftDisplay[2] >= 50) {
          tiles[carsLeftDisplay[i]].classList.remove('carsLeft')
          carsLeftDisplay[i] -= 1
          tiles[carsLeftDisplay[i]].classList.add('carsLeft')
        } else if (carsLeftDisplay[0] <= 45 && carsLeftDisplay[2] <= 53) {
          tiles[carsLeftDisplay[i]].classList.remove('carsLeft')
          carsLeftDisplay[i] += 2
          console.log(carsLeftDisplay)
          tiles[carsLeftDisplay[i]].classList.add('carsLeft')
        }
      })
    }, 1000)
  }

  //moveCarsLeft()


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