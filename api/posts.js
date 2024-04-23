const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const express = require('express');

router.use(express.json());

router.get('/', async(req, res, next) => {
  try{
  const posts = await prisma.posts.findMany();
  res.json(posts);
  next();
  } catch(err){
    throw err;
  }
});

router.get('/:id', async(req, res) => {
  const {id} = req.params
  try{
  const post = await prisma.posts.findUnique({
    where: {
      id: parseInt(id)
    }
  });
  res.json(post);
  } catch(err){
    throw err;
  }
});

router.post('/', async(req,res) => {
  const authHeader = req.headers['authorization'];
  if(!authHeader){
    res.status(401).send(`Please try logging in first`);
  };
  const { title, content } = req.body;
  const prefix = `Bearer `;
  const token = authHeader.slice(prefix.length);

  try{
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if(err){
      return res.status(401).send(`Please try logging in`);
    }
  const userid = decoded.id;
  const createdPost = await prisma.posts.create({
    data: {
      title,
      content,
      userid
    }
  });
  res.status(201).json(createdPost);
  });
}catch(err){
  throw(err);
}
});

router.put('/:id', async(req,res) => {
  const authHeader = req.headers['authorization'];
  const {id} = req.params;
  if(!authHeader){
    res.status(401).send(`Please try logging in first`);
  };
  const { title, content } = req.body;
  const prefix = `Bearer `;
  const token = authHeader.slice(prefix.length);

  try{
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if(err){
      return res.status(401).send(`Please try logging in`);
    }
  const userid = decoded.id;
  const updatedPost = await prisma.posts.update({
    where: {
      id: parseInt(id),
      userid
    },
    data: {
      title,
      content
    }
  });
  res.status(201).json(updatedPost);
  });
}catch(err){
  throw(err);
}
});

router.delete('/:id', async(req,res) => {
  const authHeader = req.headers['authorization'];
  const {id} = req.params;
  if(!authHeader){
    res.status(401).send(`Please try logging in first`);
  };
  const prefix = `Bearer `;
  const token = authHeader.slice(prefix.length);

  try{
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if(err){
      return res.status(401).send(`Please try logging in`);
    }
  const userid = decoded.id;
  const deletedPost = await prisma.posts.delete({
    where: {
      id: parseInt(id),
      userid
    }
  });
  res.status(201).json(deletedPost);
  });
}catch(err){
  throw(err);
}
});

module.exports = router;