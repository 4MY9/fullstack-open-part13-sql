
const router = require('express').Router()
const Session = require('../models/session')
const { tokenExtractor } = require('../util/middleware')


router.delete('/', tokenExtractor, async (req, res) => {
  try {
    await Session.destroy({ 
      where: { userId: req.decodedToken.id}
  })
  } catch(error) {
    return res.status(400).json({ error })
  }
    res.status(204).end()
})



module.exports = router