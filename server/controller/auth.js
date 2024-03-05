import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import { } from 'express-async-error';
import * as userRepository from '../data/auth.js';

// TODO: Make it secure!
const jwtSecretKey = 'asdfsdfsdfwefwe';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username}는 이미 사용중인 이름입니다.` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: `존재하지 않는 사용자입니다.1` });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: `존재하지 않는 사용자입니다.2` });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}