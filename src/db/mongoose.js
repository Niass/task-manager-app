const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required:true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
      }
    }
  },
  password:{
    type: String,
    minlength:7,
    required:true,
    trim:true,
    validate(value){
      if(value.toLowerCase( ).includes('password')) {
        throw new Error('must not include password')
      }
    }
  },
  age: {
    type: Number,
    default:0,
    validate(value) {
      if (value < 0) {
        throw Error('Age must be a positive number');
      }
    }
  }
});

const Task = mongoose.model('Task', {
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});
const me = new User({
  name: 'Fred',
  email: 'hello@gmail.com'
});

const myTask = new Task({
  description: 'master react',
  completed: false
});

// myTask
//   .save()
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

me.save()
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log('Error ', error);
  });
