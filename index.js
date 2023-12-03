// sup gangstas
const fs = require('fs')

const ORDER = {
  FIRST: 'FIRST',
  LAST: 'LAST',
}

const NUMBOS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

const getLetterPyschoMode = (dumbString, order) => {
  if (order === ORDER.FIRST) {
    let wordIndex = Infinity
    let wordCursor = null
    const numIndex = dumbString.search(/[0-9]/)

    NUMBOS.forEach((num, index) => {
      const thisNumWordIndex = dumbString.indexOf(num)
      if (thisNumWordIndex !== -1 && thisNumWordIndex < wordIndex) {
        wordIndex = thisNumWordIndex
        wordCursor = index
      }
    })

    return wordIndex < numIndex ? `${wordCursor}` : dumbString[numIndex]
  }

  if (order === ORDER.LAST) {
    let wordIndex = -1
    let wordCursor = null
    const numIndex = dumbString.search(/([0-9])([a-z|A-Z])*$/)

    NUMBOS.forEach((num, index) => {
      const thisNumWordIndex = dumbString.lastIndexOf(num)
      if (thisNumWordIndex > wordIndex) {
        wordIndex = thisNumWordIndex
        wordCursor = index
      }
    })

    return wordIndex > numIndex ? `${wordCursor}` : dumbString[numIndex]
  }

  throw new Error('you frigged up big time bub!')
}

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const calibungos = data.split(/\r?\n/)
  const finalCalibungus = calibungos.reduce((accumulatingBozo, currentBozo) => {
    return (
      accumulatingBozo +
      parseInt(
        `${currentBozo[currentBozo.search(/[0-9]/)]}${
          currentBozo[currentBozo.search(/([0-9])([a-z|A-Z])*$/)]
        }`
      )
    )
  }, 0)

  console.log(`Here is the FINAL CALIBUNGUS ${finalCalibungus}`)

  const partTwoGuyNumberHeaven = calibungos.reduce(
    (accumulatingBozo, currentBozo) => {
      return (
        accumulatingBozo +
        parseInt(
          `${getLetterPyschoMode(
            currentBozo,
            ORDER.FIRST
          )}${getLetterPyschoMode(currentBozo, ORDER.LAST)}`
        )
      )
    },
    0
  )

  console.log(`part 2: ${partTwoGuyNumberHeaven}`)
})
