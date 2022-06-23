const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const jsonResp = require('./test.json');
const router = new express.Router();

router.post('/prebids', async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    const saveTask = await task.save();
    res.status(201).send(jsonResp);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /tasks?completed=true
// GET /tasks. limit=10&skipe=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }
  if (req.query.sortBy) {
    const [first, second] = req.query.sortBy.split(':');
    sort[first] = second === 'desc' ? -1 : 1;
  }
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    // res.send(tasks);
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findById(_id);

    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
