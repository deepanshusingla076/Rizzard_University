const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

  router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
    
  fs.readFile(path.join(__dirname, '../db/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err);
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return res.status(302).redirect('/dashboard');
    } else {
      return res.status(302).redirect('/register');
    }
  });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  fs.readFile(path.join(__dirname, '../db/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err);
    let users = [];
    if (data) {
      users = JSON.parse(data);
    }
    users.push(newUser);
    fs.writeFile(path.join(__dirname, '../db/users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err);
      res.status(302).redirect('/');
    });
  });
});

router.post('/submit-event-registration', (req, res, next) => {
  const { name, email, phone, college, event } = req.body;
  
  if (!name || !email || !phone || !college || !event) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newRegistration = {
    name,
    email,
    phone,
    college,
    event,
    timestamp: new Date().toISOString(),
  };
  fs.readFile(path.join(__dirname, '../db/formData.json'), 'utf-8', (err, data) => {
    if (err) return next(err);

    let formData = [];
    if (data) {
      formData = JSON.parse(data);
    }

    formData.push(newRegistration);


    fs.writeFile(path.join(__dirname, '../db/formData.json'), JSON.stringify(formData, null, 2), (err) => {
      if (err) return next(err);
      res.status(200).redirect('/event');

    });
  }); 
});

module.exports = router;