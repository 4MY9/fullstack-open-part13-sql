const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../util/middleware')


const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }

router.get('/', async (req, res) => {
  
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['username']
      },
      where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${req.query.search || ""}%`,
          }
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search || ""}%`,
          }
        }
      ]
    },
    order: [
      ['likes', 'DESC'],
    ]
    })
    blogs.map(blog => console.log(blog.author + ": '" + blog.title + "',", blog.likes, "likes"))
    res.json(blogs)
  })


  
router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
    res.json(blog)
  } catch(error) {
     return res.status(400).json({ error })
   }
  })
  
router.get('/:id', blogFinder, async (req, res) => {  
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
 }
})
  
router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId === req.decodedToken.id) {
      await req.blog.destroy()
    }
  }
    res.status(204).end()
})



  
router.put('/:id', blogFinder, async (req, res) => {   
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router
