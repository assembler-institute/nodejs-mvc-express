async function checkParam (req, res, next) {
  const { id } = req.params
  try {
    id && console.log(`Check the id ${id}`)
    next()
  } catch (error) {
    next(error)
  }
}

async function doubleCheckParam (req, res, next) {
  const { id } = req.params
  try {
    id && console.log(`Double check the id ${id}`)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkParam,
  doubleCheckParam
}
