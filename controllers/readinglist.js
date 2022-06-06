const router = require('express').Router()

const { Readinglist, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (_req, res) => {
  try {
    const readinglist = await Readinglist.findAll();
    res.json(readinglist);
  } catch (error) {
    console.log('ERROR:', error.message);
    return res.status(400).json({ error })
  }
});

router.post('/', async (req, res) => {
  try {
    const readinglist = await Readinglist.create(req.body)
    console.log(req.body)
    res.json(readinglist)

    } catch(error) {
      return res.status(400).json({ error })
    }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ 
    where: { 
      userId: req.params.id
    }
  })
  const readinglistBlog = await Readinglist.findByPk(req.params.id);
  
  if (!readinglistBlog) {
    return res.status(400).json({ error })
  }

  if (user.id == readinglistBlog.userId) {
    readinglistBlog.read = req.body.read
    await readinglistBlog.save()
    res.json(readinglistBlog)
  } else {
    res.status(404).end()
  }
})

module.exports = router