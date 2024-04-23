const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');

router.use(express.json());

router.get('/', (req, res) => {
  res.send(`<h1>Welcome to the auth route</h1>`);
});

router.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try{
    const hashedPass = await bcrypt.hash(password, saltRounds);
    const createdUser = await prisma.users.create({
      data:{
        username,
        password: hashedPass
      }
    });
    const token = jwt.sign({ id: createdUser.id}, process.env.SECRET);
    res.status(201).send({token});
  }catch(err){
    throw(err);
  }
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await prisma.users.findUnique({
      where:{
        username
      }
    });
    const matchedPassword = await bcrypt.compare(password, user.password);

    if(!user || !matchedPassword){
      return res.status(401).send(`Invalid Login Credentials`);
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.status(201).send({token});
  }catch(err){
    throw(err);
  }
});

module.exports = router;