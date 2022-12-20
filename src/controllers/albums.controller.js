
const allAlbums = async (req, res, next) => {
  try {
    res.status(200).send({ status: 'OK', msg: 'All albums' })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}

const singleAlbum = async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(200).send({ status: 'OK', msg: `Get album with ID ${id}` })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}

const deleteAlbum = async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(200).send({ status: 'OK', msg: `Deleted album with id ${id}` })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}
const updateAlbum = async (req, res, next) => {
  const { id } = req.params
  const body = req.body

  try {
    res.status(200).send({ status: 'OK', msg: `Updated album with id ${id}`, body })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}
const createAlbum = async (req, res, next) => {
  const body = req.body

  try {
    res.status(201).send({ status: 'OK', msg: 'Created new album', body })
  } catch (error) {
    res.status(500).send({ status: 'FALSE' })
  }
}

module.exports = {
  allAlbums,
  singleAlbum,
  deleteAlbum,
  updateAlbum,
  createAlbum
}
