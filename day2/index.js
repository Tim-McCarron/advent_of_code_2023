const fs = require('fs')

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const bigGamesOnCampus = data.split(/\r?\n/)

  const possibleCubes = {
    red: 12,
    green: 13,
    blue: 14,
  }

  let bigGameIDSumGuy = 0
  let partTwoAustinPowers = 0

  bigGamesOnCampus.forEach(gam => {
    const id = gam.substring(5, gam.indexOf(':'))
    // https://www.youtube.com/watch?v=sDipbctxGC4
    let hasFailedTheEmperor = false
    const rounds = gam
      .substring(gam.indexOf(':') + 1)
      .split(';')
      .map(round =>
        round
          .split(/(\s[0-9]*\s)/)
          .filter(buh => !!buh)
          .map(guy => guy.trim().replace(',', ''))
      )

    // part 1
    rounds.forEach(round => {
      for (let bongo = 0; bongo < round.length - 1; bongo++) {
        if (bongo % 2 === 0) {
          const color = round[bongo + 1]
          if (possibleCubes[color] < parseInt(round[bongo])) {
            hasFailedTheEmperor = true
            break
          }
        }
      }
    })

    if (!hasFailedTheEmperor) {
      bigGameIDSumGuy += parseInt(id)
    }
    // part 2
    const minColors = {
      red: 0,
      blue: 0,
      green: 0,
    }
    rounds.forEach(round => {
      for (let bongo = 0; bongo < round.length - 1; bongo++) {
        if (bongo % 2 === 0) {
          const color = round[bongo + 1]
          const numCubi = parseInt(round[bongo])
          if (minColors[color] < numCubi) {
            minColors[color] = numCubi
          }
        }
      }
    })

    partTwoAustinPowers += minColors.red * minColors.blue * minColors.green
  })

  console.log(`THE BIG SUM PART ONE: ${bigGameIDSumGuy}`)
  console.log(`AUSTIN POWERS PART 2: ${partTwoAustinPowers}`)
})
