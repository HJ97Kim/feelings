const express = require('express');

const { Post, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();
// req: 프론트에서 보내온 요청정보 res: 응답정보
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { UserId: req.user.id },
      include: [{
        model: User,
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => { // POST /post
  try {
    const post = await Post.create({
      date: req.body.date,
      feeling: req.body.feeling,
      content: req.body.content,
      UserId: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => { // DELETE /post
  res.json({ id: 1 });
});

module.exports = router;