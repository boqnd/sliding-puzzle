import { Router } from 'express';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import { userService } from '../services/userService.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();


router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await userService.findByUsername(username);

    if (oldUser.length) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userService.create({
      username,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user.id, username },
      process.env.SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    const users = await userService.findByUsername(username);
    var user;

    if (users.length) user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, username },
        process.env.SECRET,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;