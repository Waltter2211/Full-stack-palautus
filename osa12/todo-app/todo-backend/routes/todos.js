const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redisFunc = require('../redis/index')

router.get('/statistics', async (req, res) => {
  const values = await redisFunc.getAsync('counterKey')
  res.send(values)
})

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let value = await redisFunc.getAsync('counterKey')

  if (value === null) {
    await redisFunc.setAsync('counterKey', 1)
    res.send(todo)
  } else {
    value++
    await redisFunc.setAsync('counterKey', value++)
    res.send(todo);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await Todo.findByIdAndUpdate(req.todo, req.body)
  res.send(req.todo); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
