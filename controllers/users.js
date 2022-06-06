const router = require('express').Router()

const { User } = require('../models')
const { Blog } = require('../models')
const { Readinglist } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
    let where = {};
    let user;
  
    if (req.query.read) {
      where.read = req.query.read === 'true';
    }
    try {
      user = await User.findByPk(req.params.id, {
        attributes: ['name', 'username'],
        include: [
          {
            model: Blog,
            attributes: {
              exclude: ['userId']
            },
            through: {
              attributes: ['id', 'read'],
              where
            }
          }
        ]
      });
      res.json(user)
    } catch(error) {
        return res.status(400).json({ error })
      }
    })
  
router.get('/:username', async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username } });
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })

router.put('/:username', async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (user) {
        user.username = req.body.username
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
    })





module.exports = router