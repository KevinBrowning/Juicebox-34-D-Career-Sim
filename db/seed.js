const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10

const createUsersAndPosts = async() => {
  const hashedPass1 = await bcrypt.hash(`nunya1`, saltRounds);
  const hashedPass2 = await bcrypt.hash(`nunya2`, saltRounds);
  const hashedPass3 = await bcrypt.hash(`nunya3`, saltRounds);

  const user1 = await prisma.users.create({
    data:{
      username: `uno`,
      password: hashedPass1
    }
  });
  const user2 = await prisma.users.create({
    data:{
      username: `does`,
      password: hashedPass2
    }
  });
  const user3 = await prisma.users.create({
    data:{
      username: `tres`,
      password: hashedPass3
    }
  });

  const post1 = await prisma.posts.create({
    data: {
      title: `Hello`,
      content: `You guessed it`,
      userid: 1
    }
  });
  const post2 = await prisma.posts.create({
    data: {
      title: `Hello again`,
      content: `You guessed it again`,
      userid: 2
    }
  });
  const post3 = await prisma.posts.create({
    data: {
      title: `Hello once again`,
      content: `You guessed it once again`,
      userid: 3
    }
  });
  const post4 = await prisma.posts.create({
    data: {
      title: `Goodbye`,
      content: `You didnt guess it`,
      userid: 1
    }
  });
  const post5 = await prisma.posts.create({
    data: {
      title: `Goodbye again`,
      content: `You didnt guess it again`,
      userid: 2
    }
  });
  const post6 = await prisma.posts.create({
    data: {
      title: `Goodbye once again`,
      content: `You didnt guess it once again`,
      userid: 3
    }
  });
  const post7 = await prisma.posts.create({
    data: {
      title: `Why final fantasy 7 is the best video game ever`,
      content: `Because it is`,
      userid: 1
    }
  });
  const post8 = await prisma.posts.create({
    data: {
      title: `Will the Detroit Lions win the superbowl?`,
      content: `Hopefully`,
      userid: 2
    }
  });
  const post9 = await prisma.posts.create({
    data: {
      title: `How to learn Prisma`,
      content: `Read the docs and hope for the best`,
      userid: 3
    }
  });
};

createUsersAndPosts();