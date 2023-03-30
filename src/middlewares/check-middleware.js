async function checkParam (req, res, next) {
  const { id } = req.params
  try {
    id ? console.log(`Check the id ${id}`) : console.log('No id')
    next()
  } catch (error) {
    next(error)
  }
}

async function doubleCheckParam (req, res, next) {
  const { id } = req.params
  try {
    id < 4 && res.status(400).send({ message: 'Id is too low' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkParam,
  doubleCheckParam
}
