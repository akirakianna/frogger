function setUpGame() {

  const grid = document.querySelector('.grid')
  const timerDisplay = document.querySelector('.timer')
  let count = 20
  let intervalId = 0
  const width = 9
  const tiles = []
  let frogPosition = 76
  const lilyPadFinish = 4
  const carsRightDisplay = [54, 57, 60]
  const carsLeftDisplay = [45, 48, 51]
  const roadDisplay = [46, 47, 49, 50, 52, 53, 55, 56, 58, 59, 61, 62]
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

  // Placing frog on grid
  tiles[frogPosition].classList.add('frog')

  // Declaring finishing tile
  tiles[lilyPadFinish].classList.add('lilypad')
  
  //Placing carRight tiles
  carsRightDisplay.forEach(car => {
    tiles[car].classList.add('carsRight')
  })
  
  // for (let i = 0; i < carsRightDisplay.length; i++) {
  //   tiles[carsRightDisplay[i]].classList.add('')
  // }

  //Placing carLeft tiles
  carsLeftDisplay.forEach(car => {
    tiles[car].classList.add('carsLeft')
  })

  //Placing road tiles
  // roadDisplay.forEach(road => {
  //   tiles[road].classList.add('road')
  // })

  //Placing logsLeft tiles

  logsLeftDisplay[0].forEach(log => {
    tiles[log].classList.add('log')
  })

  logsLeftDisplay[1].forEach(log => {
    tiles[log].classList.add('log')
  })

  //Placing logsRight tiles
  logsRightDisplay[0].forEach(log => {
    tiles[log].classList.add('log')
  })

  logsRightDisplay[1].forEach(log => {
    tiles[log].classList.add('log')
  })

  // Placing water tiles

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

  // CREATING MOVEMENT FOR FROG
  // Needs to be inside of start eventListener

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      if (frogPosition === tiles.length - 1) {
        return
      }
      frogPosition += 1
      renderGame()
    } else if (e.key === 'ArrowLeft') {
      if (frogPosition === 0) {
        return
      }
      frogPosition -= 1
      renderGame()
    } else if (e.key === 'ArrowUp') {
      if (frogPosition < width) {
        return
      }
      frogPosition -= width
      renderGame()
    } else if (e.key === 'ArrowDown') {
      if (frogPosition > (tiles.length - width - 1)) {
        return
      }
      frogPosition += width
      renderGame()
    }
  })

  // CREATING GAME TIMER/ COUNTDOWN
  //Needs to be inside of start Event Listener click

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


  // CREATING CAR MOVEMENT

  // function moveCars() {
  //   carsRightDisplay.forEach(carRight => {
  //     moveCarsRight(carRight)
  //   })
  // }

  function moveCarsRight() {
    setInterval(() => {
      carsRightDisplay.forEach((car, i) => {
        if (carsRightDisplay[2] <= 63 && carsRightDisplay[0] < 56) {
          tiles[carsRightDisplay[i]].classList.remove('carsRight')
          console.log(car)
          carsRightDisplay[i] += 1
          console.log(car)
          tiles[carsRightDisplay[i]].classList.add('carsRight')
        } else if (carsRightDisplay[0] > 53 && carsRightDisplay[2] >= 60) {
          tiles[carsRightDisplay[i]].classList.remove('carsRight')
          console.log(car)
          carsRightDisplay[i] -= 1
          console.log(car)
          tiles[carsRightDisplay[i]].classList.add('carsRight')
        }

       
    
      })


    }, 1000)



  }

  moveCarsRight()
 

  // figure out co-ords of right wall length of array % width = 0 .... use google
  // figure out co-ords of left wall % width will return 0     
  //.... all numbers right wall % width (-1) will return 0

  //if left wall true move carsRightDisplay, if right wall move left

  //save to variables  leftwall ==== this module

  //2 booleans right wall and left wall
  // so if its right wall makes true... 





      









}

window.addEventListener('load', setUpGame)