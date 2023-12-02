// sup gangstas
const fs = require('fs')

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
})
