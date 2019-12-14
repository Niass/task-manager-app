const request = require('supertest');
const app = require('../src/app');

const Task = require('../src/models/task');
const {
  userOne,
  userOneId,
  userTwoId,
  userTwo,
  setUpDatabase,
  taskOne,
  taskTwo,
  taskThree
} = require('./fixtures/db');
beforeEach(setUpDatabase);

test('Should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'From my test'
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('Should fetch only user tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const length = response.body.length;
  expect(length).toEqual(2);
});

test('Should not be able to delete userOne task', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);
  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
